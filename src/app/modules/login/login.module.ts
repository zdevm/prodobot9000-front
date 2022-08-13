import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { LoginComponent } from './components/login/login.component';
import { MagicCodeAuthModule } from '@modules/magic-code-auth/magic-code-auth.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    LoginModalComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MagicCodeAuthModule,
    NgbModalModule
  ],
  exports: [LoginModalComponent]
})
export class LoginModule { }
