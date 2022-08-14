import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@modules/auth/auth.service";
import { EnvService } from "@shared/services/env/env.service";
import { flow } from "lodash-es";
import { catchError, Observable, switchMap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonHttpInterceptor implements HttpInterceptor {

  public constructor(private readonly envService: EnvService,
                     private readonly authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = flow(this.enrichUrl, this.enrichAuth).bind(this)(req);
    return this.handleWithRetryAuth(request, next);
  }

  private enrichAuth(req: HttpRequest<any>): HttpRequest<any> {
    if (!this.accessToken) {
      return req;
    }
    return req.clone({
      setHeaders: {
          Authorization: `Bearer ${this.accessToken}`
        }
    });
  }

  private enrichUrl(req: HttpRequest<any>): HttpRequest<any> {
    const apiUrl = this.envService.getOrThrow('api.url')
    return req.clone({
      url: `${apiUrl}/${req.url}`
    });
  }

  private handleWithRetryAuth(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // try refreshing
        if (err.status === HttpStatusCode.Unauthorized
            && err.error?.message === 'INVALID_ACCESS_TOKEN'
            && this.refreshToken) {
          return this.authService.reAuthWithRefreshToken(this.refreshToken).pipe(
            switchMap((tokens: {accessToken: string}) => {
              this.authService.accessToken = tokens.accessToken;
              request = this.enrichAuth(request);
              return next.handle(request)
            })
          )
        }
        return throwError(() => err);
      }
      return throwError(() => err);
    }))
  }

  private get accessToken() {
    return this.authService.accessToken;
  }

  private get refreshToken() {
    return this.authService.refreshToken;
  }

}