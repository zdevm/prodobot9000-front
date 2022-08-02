import { Component, OnInit } from '@angular/core';
import { ProductService } from '@modules/product/services/product.service';
import { PaginateOptions } from '@shared/classes/paginate-options';
import { Pagination } from '@shared/classes/pagination';
import { Product } from '../classes/product';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
  productsPagination?: Pagination<Product>;
  readonly limit = 5;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts()
  }

  onPage(page: number) {
    this.fetchProducts(page, this.limit)
  }

  private fetchProducts(page: number = 1, limit: number = this.limit) {
    const paginateOptions = new PaginateOptions();
    paginateOptions.page = page;
    paginateOptions.limit = limit;
    this.productService.getMyProducts(paginateOptions).subscribe(paginated => {
      this.productsPagination = paginated;
      console.log(this.productsPagination);
    })
  }

}
