import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { Env } from '@shared/interfaces/env';
import { CommonHttpInterceptor } from '@shared/interceptors/http-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingScreenModule } from '@shared/loading-screen/loading-screen.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BreadcrumbModule } from '@modules/breadcrumb/breadcrumb.module';

export const EnvInjectionToken = new InjectionToken<Env>('ENVIRONMENT Injection token', {
  providedIn: 'root',
  factory: () => environment
});

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    LoadingScreenModule,
    SweetAlert2Module.forRoot(),
    BreadcrumbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CommonHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
