import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanizeTimeDiffPipe } from './humanize-time-diff.pipe';



@NgModule({
  declarations: [
    HumanizeTimeDiffPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [HumanizeTimeDiffPipe]
})
export class HumanizeTimeDiffModule { }
