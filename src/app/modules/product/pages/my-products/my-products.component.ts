import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '@modules/product/services/product.service';
import { PaginateOptions } from '@shared/classes/paginate-options';
import { Pagination } from '@shared/classes/pagination';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
import { TitleService } from '@shared/services/title/title.service';
import { finalize } from 'rxjs';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
  productsPagination?: Pagination<Product>;
  readonly limit = 5;

  constructor(private readonly productService: ProductService,
              private readonly loadingScreen: LoadingScreenService,
              private readonly titleService: TitleService) {}

  ngOnInit(): void {
    this.onPage(1)
    this.titleService.setTitle($localize`My products`);
  }

  onPage(page: number) {
    this.fetchProducts(page, this.limit).subscribe(paginated => {
      this.productsPagination = paginated;
    })
  }

  private setLoading(show: boolean) {
    this.loadingScreen.show(show);
  }

  private fetchProducts(page: number = 1, limit: number = this.limit) {
    const paginateOptions = new PaginateOptions();
    paginateOptions.page = page;
    paginateOptions.limit = limit;
    this.setLoading(true);
    return this.productService.getMyProducts(paginateOptions)
                              .pipe(finalize(() => this.setLoading(false)))

  }

}
