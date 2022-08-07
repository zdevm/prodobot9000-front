import { Injectable } from '@angular/core';
import { RateProviderFormOptions } from '@modules/rate-provider/interfaces/form-options.interface';
import { PaginateOptions } from '@shared/classes/paginate-options';
import { Pagination } from '@shared/classes/pagination';
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

  updateById(id: string, partial: Partial<Product>) {
    return this.http.put<Product>(`${this.url}/${id}`, partial)
                    .pipe(map(ProductService.transform))
  }

  deleteById(id: string) {
    return this.http.delete<Product>(`${this.url}/${id}`)
                    .pipe(map(ProductService.transform))
  }

  getMyProducts(paginateOptions: PaginateOptions) {
    return this.http.get<Pagination<Product>>(`${this.url}`, { params: paginateOptions as any })
                    .pipe(map(ProductService.transformPagination))
  }

  setFormForProviderCommand(id: string,
                            providerSlug: string,
                            command: keyof RateProviderFormOptions,
                            form: any) {
    return this.http.put<Product>(`${this.url}/${id}/provider-form/${providerSlug}/${command}`, form);
  }

  static transformPagination(rawPagination: Pagination<any>) {
    const pagination = plainToInstance(Pagination<Product>, rawPagination, { excludeExtraneousValues: true })
    pagination.docs = ProductService.transform(rawPagination.docs || []) as any;
    return pagination;
  }

  static transform(raw: any) {
    return plainToInstance(Product, raw, { excludeExtraneousValues: true })
  }

}
