import { Component, Input, OnInit } from '@angular/core';
import { ProductRate } from '@modules/product-rate/classes/product-rate';

@Component({
  selector: 'product-rates-table',
  templateUrl: './rates-table.component.html',
  styleUrls: ['./rates-table.component.scss']
})
export class RatesTableComponent implements OnInit {
  @Input() rates: ProductRate[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
