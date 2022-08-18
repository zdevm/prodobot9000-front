import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanizeStatusPipe } from './humanize-status.pipe';



@NgModule({
  declarations: [
    HumanizeStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [HumanizeStatusPipe]
})
export class HumanizeStatusModule { }
