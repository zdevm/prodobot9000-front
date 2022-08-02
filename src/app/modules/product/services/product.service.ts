import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpService {
  constructor() {
    super('/products/');
    console.log(this.url)
  }

  create(dto: CreateProductDto) {
    return this.http.post(this.url, dto);
  }

}
