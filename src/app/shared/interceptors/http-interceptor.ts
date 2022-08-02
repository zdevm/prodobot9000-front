import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EnvService } from "@shared/services/env/env.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonHttpInterceptor implements HttpInterceptor {

  public constructor(private envService: EnvService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = this.envService.getOrThrow('api.url')
    const newRequest = req.clone({
      url: `${apiUrl}/${req.url}`
    });
    return next.handle(newRequest);
  }

}