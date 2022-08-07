import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbItem } from '@modules/breadcrumb/classes/breadcrumb-item';
import { BreadcrumbService } from '@modules/breadcrumb/services/breadcrumb.service';
import { ProductRate } from '@modules/product-rate/classes/product-rate';
import { ProductRateService } from '@modules/product-rate/services/product-rate.service';
import { ProductService } from '@modules/product/services/product.service';
import { RateProviderService } from '@modules/rate-provider/services/rate-provider.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Env } from '@shared/interfaces/env';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
import { HelperService } from '@shared/services/helper/helper.service';
import { finalize, lastValueFrom, Subject, takeUntil } from 'rxjs';
import { EnvInjectionToken } from 'src/app/app.module';
import Swal from 'sweetalert2';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnDestroy {
  @ViewChild('providersModal') providersModal: any;
  providersModalRef?: NgbModalRef;
  product?: Product;
  rates: ProductRate[] = [];
  btnLoadingMap = {
    'scan': false,
  }
  isDevMode = HelperService.isDevMode;

  private unsub$ = new Subject<void>();

  constructor(private productService: ProductService,
              private loadingScreen: LoadingScreenService,
              private readonly rateProviderService: RateProviderService,
              private readonly fb: FormBuilder,
              private readonly modalService: NgbModal,
              private readonly route: ActivatedRoute,
              private readonly productRateService: ProductRateService,
              private readonly router: Router,
              private readonly breadcrumbService: BreadcrumbService) {
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
                  this.rates = await lastValueFrom(this.fetchLastRates(productId)).catch(() => []);
                  this.prepareBreadcrumb();
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
      cancelButtonText: 'Go back',
      showConfirmButton: true,
      confirmButtonText: 'Delete product',
      customClass: {
        confirmButton: 'btn bg-danger',
        cancelButton: 'btn bg-primary'
      }
    });
    if (value.dismiss) {
      return;
    }
    this.deleteProduct(this.product.id).subscribe(async deletedProduct => {
      await Swal.fire({
        icon: 'success',
        title: $localize`'${deletedProduct.name}' has been successfully deleted!`,
        timer: 5000,
        showCloseButton: true,
        showConfirmButton: false
      });
      this.router.navigate(['/products']);
    })
  }

  onImageUpdated(fileId: string) {
    const productId = HelperService.id(this.product);
    if (!productId) {
      return;
    }
    this.productService.updateById(productId, { image: fileId }).subscribe({
      next: updatedProduct => {
        this.product = updatedProduct;
      }
    })
  }

  onProductUpdated(product: Product) {
    Swal.fire({
      icon: 'success',
      titleText: $localize`Product has been successfully updated!`,
      showConfirmButton: true
    })
    this.product = product;
    this.closeProvidersModal();
  }

  openProvidersModal() {
    this.providersModalRef = this.modalService.open(this.providersModal);
  }

  closeProvidersModal() {
    this.providersModalRef?.close();
    this.providersModalRef = undefined;
  }

  onProvidersBtn() {
    this.openProvidersModal();
  }

  onScanBtn(mock = false) {
    const productId = HelperService.id(this.product);
    if (!productId) {
      throw new Error('Cannot continue without product ID')
    }
    this.scanForRates(productId, mock).subscribe(rates => this.rates = rates);
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

  private scanForRates(id: string, mock = false) {
    this.btnLoadingMap.scan = true;
    return this.productService.scanForRates(id, mock)
                              .pipe(finalize(() => this.btnLoadingMap.scan = false));
  }

  private fetchLastRates(id: string) {
    this.setLoading(true);
    return this.productRateService.getLatestOfEachProvider(id)
                                  .pipe(finalize(() => this.setLoading(false)));
    
  }

  private setLoading(show: boolean) {
    this.loadingScreen.show(show);
  }

  private prepareBreadcrumb() {
    if (this.product) {
      this.breadcrumbService.clear();
      this.breadcrumbService.set(([
        new BreadcrumbItem({ label: $localize`My Products`, url: '/products' }),
        new BreadcrumbItem({ label: this.product.name }),
      ]))
    };
  }

}
