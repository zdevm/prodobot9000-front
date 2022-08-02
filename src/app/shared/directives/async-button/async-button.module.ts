import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncButtonDirective } from './async-button.directive';



@NgModule({
  declarations: [AsyncButtonDirective],
  imports: [
    CommonModule
  ],
  exports: [AsyncButtonDirective]
})
export class AsyncButtonModule { }
