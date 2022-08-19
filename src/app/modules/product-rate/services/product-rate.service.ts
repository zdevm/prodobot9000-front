import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { ProductRate } from '../classes/product-rate';

@Injectable({
  providedIn: 'root'
})
export class ProductRateService extends HttpService {

  constructor() {
    super('rates');
  }

  getLatestOfEachProvider(productId: string): Observable<ProductRate[]> {
    return this.http.get<any[]>(`${this.url}/${productId}/latest`)
                    .pipe(map((docs: any[]) => <ProductRate[]>ProductRateService.transform(docs)));
  }

  getPriceHistoryOfProduct(productId: string): Observable<{ date: string; rates: Pick<ProductRate, 'providerSlug' | 'price'>[]; }[]> {
    return this.http.get<any[]>(`${this.url}/${productId}/history`);
  }

  static transform(doc: any): ProductRate | ProductRate[] {
    return plainToInstance(ProductRate, doc);
  }

}
