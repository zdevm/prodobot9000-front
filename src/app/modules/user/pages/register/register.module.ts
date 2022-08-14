import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlValidationClassesModule } from '@shared/directives/control-validation-classes/control-validation-classes.module';
import { AsyncButtonModule } from '@shared/directives/async-button/async-button.module';

const routes: Routes = [
  { path: '', component: RegisterComponent }
]


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ControlValidationClassesModule,
    AsyncButtonModule
  ],
  exports: [RouterModule]
})
export class RegisterModule { }
