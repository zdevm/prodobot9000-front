import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlFormControlComponent } from './url-form-control.component';



@NgModule({
  declarations: [
    UrlFormControlComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [UrlFormControlComponent]
})
export class UrlFormControlModule { }
