import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanCardComponent } from './scan-card.component';
import { HumanizeStatusModule } from '@modules/scan/pipes/humanize-status/humanize-status.module';
import { HumanizeTriggerModule } from '@modules/scan/pipes/humanize-trigger/humanize-trigger.module';
import { RatesTableModule } from '@modules/product/components/rates-table/rates-table.module';
import { HumanizeTimeDiffModule } from '@shared/pipes/humanize-time-diff/humanize-time-diff.module';
import { HumanizeDurationModule } from '@shared/pipes/humanize-duration/humanize-duration.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ScanCardComponent
  ],
  imports: [
    CommonModule,
    HumanizeStatusModule,
    HumanizeTriggerModule,
    RatesTableModule,
    HumanizeTimeDiffModule,
    HumanizeDurationModule,
    NgbTooltipModule
  ],
  exports: [ScanCardComponent]
})
export class ScanCardModule { }
