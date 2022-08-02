import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@modules/product/services/product.service';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
import { finalize, lastValueFrom, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Product } from '../classes/product';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnDestroy {
  product?: Product;

  private unsub$ = new Subject<void>();

  constructor(private productService: ProductService,
              private loadingScreen: LoadingScreenService,
              private route: ActivatedRoute) {
    // watch for params changes
    // if params change, fetch product
    route.params.pipe(takeUntil(this.unsub$))
                .subscribe(async params => {
                  const productId = params['id'];
                  if (!productId) {
                    this.product = undefined;
                    return;
                  } else if (this.product?.id === productId) {
                    return;
                  }
                  this.product = await lastValueFrom(this.fetchProduct(productId));
                });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  async onDeleteBtn() {
    if (!this.product) {
      return;
    }
    const value = await Swal.fire({
      title: $localize`Are you sure you want to continue?`,
      text: $localize`'${this.product.name}' will be deleted permanently!`,
      showCancelButton: true,
      cancelButtonColor: 'light',
      cancelButtonText: 'Go back',
      showConfirmButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Delete product'
    });
    if (value.dismiss) {
      return;
    }
    this.deleteProduct(this.product.id).subscribe(deletedProduct => {
      console.log(deletedProduct);
    })
  }

  private deleteProduct(id: string) {
    this.setLoading(true);
    return this.productService.deleteById(id)
                              .pipe(finalize(() => this.setLoading(false)));
  }

  private fetchProduct(id: string) {
    this.setLoading(true);
    return this.productService.findById(id)
                              .pipe(finalize(() => this.setLoading(false)));
  }

  private setLoading(show: boolean) {
    this.loadingScreen.show(show);
  }

}
