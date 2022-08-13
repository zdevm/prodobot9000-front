import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@modules/auth/auth.service";
import { EnvService } from "@shared/services/env/env.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonHttpInterceptor implements HttpInterceptor {

  public constructor(private readonly envService: EnvService,
                     private readonly authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = this.enrichUrl(req);
    request = this.enrichAuth(request);
    return next.handle(request);
  }

  private enrichAuth(req: HttpRequest<any>): HttpRequest<any> {
    if (!this.authService.accessToken) {
      return req;
    }
    return req.clone({
      setHeaders: {
          Authorization: `Bearer ${this.authService.accessToken}`
        }
    });
  }

  private enrichUrl(req: HttpRequest<any>): HttpRequest<any> {
    const apiUrl = this.envService.getOrThrow('api.url')
    return req.clone({
      url: `${apiUrl}/${req.url}`
    });
  }

}