import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderFormComponent } from './provider-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UrlFormControlModule } from '../url-form-control/url-form-control.module';



@NgModule({
  declarations: [
    ProviderFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UrlFormControlModule
  ],
  exports: [ProviderFormComponent]
})
export class ProviderFormModule { }
