import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumanizeTriggerPipe } from './humanize-trigger.pipe';



@NgModule({
  declarations: [
    HumanizeTriggerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [HumanizeTriggerPipe]
})
export class HumanizeTriggerModule { }
