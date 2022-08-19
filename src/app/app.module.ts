import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonHttpInterceptor } from '@shared/interceptors/http-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingScreenModule } from '@shared/loading-screen/loading-screen.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginModule } from '@modules/login/login.module';
import { MenuModule } from '@modules/menu/menu.module';
import { HeaderModule } from '@modules/header/header.module';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import "reflect-metadata";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    LoadingScreenModule,
    SweetAlert2Module.forRoot(),
    LoginModule,
    HeaderModule,
    MenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CommonHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
