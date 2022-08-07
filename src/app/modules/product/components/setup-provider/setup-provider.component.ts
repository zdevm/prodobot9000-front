import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@modules/product/pages/classes/product';
import { ProductService } from '@modules/product/services/product.service';
import { RateProvider } from '@modules/rate-provider/classes/rate-provider';
import { RateProviderForm } from '@modules/rate-provider/interfaces/form-options.interface';
import { RateProviderService } from '@modules/rate-provider/services/rate-provider.service';
import { LoadingScreenService } from '@shared/loading-screen/loading-screen.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'setup-provider',
  templateUrl: './setup-provider.component.html',
  styleUrls: ['./setup-provider.component.scss']
})
export class SetupProviderComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Output() productUpdated = new EventEmitter<Product>();
  providers: RateProvider[] = [];
  selectedProvider?: RateProvider;
  form!: FormGroup;
  formSchema?: RateProviderForm;
  private unsub$ = new Subject<void>();

  constructor(private readonly productService: ProductService,
              private readonly loadingScreenService: LoadingScreenService,
              private readonly rateProviderService: RateProviderService,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (!this.product) {
      throw new Error('SetupProviderComponent must be specified!')
    }
    this.form = this.initForm();
    this.fetchProviders().subscribe(providers => {
      this.providers = providers
    })
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  onProviderSelection(providerSlug: string) {
    this.formSchema = undefined;
    this.selectedProvider = undefined;
    this.form.get('providersForm')?.setValue(null);
    const provider = this.providers.find(p => p.slug === providerSlug)
    if (!provider) {
      throw new Error('Invalid provider selection')
    }
    this.selectedProvider = provider;
    this.fetchProviderFormOptions(this.selectedProvider!.slug).subscribe(formOptions => {
      if (this.selectedProvider?.slug) { // must not be undefined.
        this.formSchema = formOptions.getProduct;
      }
      // patch providers form
      if (this.product.providersForms?.[providerSlug]?.getProduct) {
        this.form.patchValue({
          providersForm: this.product.providersForms[providerSlug].getProduct
        })
      }
    });
  }

  fetchProviders() {
    this.setLoading(true);
    return this.rateProviderService.getProviders()
                                   .pipe(finalize(() => this.setLoading(false)))
  }

  fetchProviderFormOptions(providerSlug: string) {
    this.setLoading(true);
    return this.rateProviderService.getFormOptions(providerSlug)
                                   .pipe(finalize(() => this.setLoading(false)))
  }

  save() {
    if (!this.product) {
      return;
    }
    const { provider, command, providersForm } = this.form.value;
    this.setLoading(true);
    this.productService.setFormForProviderCommand(this.product.id, provider, command, providersForm)
    .pipe(finalize(() => this.setLoading(false)))
    .subscribe(updatedProduct => {
      this.productUpdated.emit(updatedProduct);
    })
  }

  private setLoading(status: boolean) {
    this.loadingScreenService.show(status);
  }

  private initForm() {
    const form = this.fb.group({
      provider: [null, [Validators.required]],
      command: ['getProduct', [Validators.required]],
      providersForm: [null, [Validators.required]]
    })
    form.get('provider')!.valueChanges.pipe(takeUntil(this.unsub$))
                                      .subscribe((v: any) => this.onProviderSelection(v))
    return form;
  }


}
