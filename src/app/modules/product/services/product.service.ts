import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../pages/classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpService {
  constructor() {
    super('products');
  }

  create(dto: CreateProductDto) {
    return this.http.post<Product>(this.url, dto)
                    .pipe(map(ProductService.transform))
  }

  findById(id: string) {
    return this.http.get<Product>(`${this.url}/${id}`)
                    .pipe(map(ProductService.transform))
  }

  deleteById(id: string) {
    return this.http.delete<Product>(`${this.url}/${id}`)
                    .pipe(map(ProductService.transform))
  }

  static transform(raw: any) {
    return plainToInstance(Product, raw, { excludeExtraneousValues: true })
  }

}
