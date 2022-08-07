import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatesTableComponent } from './rates-table.component';



@NgModule({
  declarations: [
    RatesTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [RatesTableComponent]
})
export class RatesTableModule { }
