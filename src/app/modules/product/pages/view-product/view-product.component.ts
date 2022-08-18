import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRate } from '@modules/product-rate/classes/product-rate';
import { ProductRateService } from '@modules/product-rate/services/product-rate.service';
import { ProductService } from '@modules/product/services/product.service';
import { Scan } from '@modules/scan/classes/scan';
import { ScanUpdatedMessage } from '@modules/scan/messages/scan-updated.message';
import { ScanService } from '@modules/scan/services/scan/scan.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
import { ExternalEventService } from '@shared/services/external-event/external-event.service';
import { HelperService } from '@shared/services/helper/helper.service';
import { TitleService } from '@shared/services/title/title.service';
import { finalize, lastValueFrom, Subject, takeUntil } from 'rxjs';
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
  editModeOn = false;
  btnLoadingMap = {
    'scan': false,
  }
  scan?: Scan;
  isDevMode = HelperService.isDevMode;

  private unsub$ = new Subject<void>();

  constructor(private productService: ProductService,
              private loadingScreen: LoadingScreenService,
              private readonly modalService: NgbModal,
              private readonly route: ActivatedRoute,
              private readonly productRateService: ProductRateService,
              private readonly router: Router,
              private readonly titleService: TitleService,
              private readonly externalEventService: ExternalEventService,
              private readonly scanService: ScanService,
              private readonly cd: ChangeDetectorRef) {
    // watch for params changes
    // if params change, fetch product
    this.route.params.pipe(takeUntil(this.unsub$))
                .subscribe(async params => {
                  const productId = params['id'];
                  if (!productId) {
                    this.product = undefined;
                    return;
                  } else if (this.product?.id === productId) {
                    return;
                  }
                  this.product = await lastValueFrom(this.fetchProduct(productId));
                  this.scan = await lastValueFrom(this.fetchLatestScan(productId)).catch(() => undefined);
                  this.listenForExternalEvents();
                  this.titleService.setTitle(this.product.name)
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

  onProductUpdated(product: Product, cb?: () => void) {
    Swal.fire({
      icon: 'success',
      titleText: $localize`Product has been successfully updated!`,
      showConfirmButton: true
    })
    this.product = product;
    if (cb) {
      cb.bind(this)();
    }
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
    this.scanForRates(productId, mock).subscribe(scan => this.scan = scan);
  }

  onEditBtn() {
    this.editModeOn = true;
  }

  setEditModeOff() {
    this.editModeOn = false;
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

  private fetchLatestScan(productId: string) {
    this.setLoading(true);
    return this.scanService.findLatestByProduct(productId)
                           .pipe(finalize(() => this.setLoading(false)));
    
  }

  private setLoading(show: boolean) {
    this.loadingScreen.show(show);
  }

  private onExternalMessage(message: ScanUpdatedMessage) {
    this.scan = message.scan;
    this.cd.detectChanges();
  }

  private listenForExternalEvents() {
    this.externalEventService.listen()
    .pipe(finalize(() => this.unsub$))
    .subscribe(message => {
      if (message instanceof ScanUpdatedMessage && HelperService.id(message.scan.product) === this.product!.id) {
        this.onExternalMessage(message);
      }
    })
  }

}
