import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceHistoryComponent } from './price-history.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    PriceHistoryComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  exports: [PriceHistoryComponent]
})
export class PriceHistoryModule { }
