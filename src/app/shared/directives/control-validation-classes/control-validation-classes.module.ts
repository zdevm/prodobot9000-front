import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValidationClassesDirective } from './control-validation-classes.directive';



@NgModule({
  declarations: [
    ControlValidationClassesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ControlValidationClassesDirective]
})
export class ControlValidationClassesModule { }
