import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProductDto } from '@modules/product/dto/create-product.dto';
import { ProductService } from '@modules/product/services/product.service';
import { EnvService } from '@shared/services/env/env.service';
import { HelperService } from '@shared/services/helper/helper.service';
import { TitleService } from '@shared/services/title/title.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  form: FormGroup;
  createdProductId: string = '';
  errors: string[] = [];
  createButtonLoading = false;

  constructor(private readonly productService: ProductService,
              private readonly envService: EnvService,
              private readonly fb: FormBuilder,
              private readonly titleService: TitleService) {
    this.form = this.initForm();
    // if we are at development, fill form
    if (!this.envService.get('production')) {
      this.mockForm();
    }
    this.titleService.setTitle($localize`Create a new product`);
  }

  public onSubmit() {
    const dto = new CreateProductDto(this.form.value);
    this.errors = [];
    this.createdProductId = '';
    this.createButtonLoading = true;
    this.productService.create(dto)
      .pipe(finalize(() => this.createButtonLoading = false))
      .subscribe({
        next: product => {
          this.createdProductId = product.id;
        },
        error: (res: HttpErrorResponse) => {
          const errors = HelperService.toArray<string>(res.error?.message);
          if (errors?.length) {
            this.errors = res.error.message;
          } else {
            this.errors.push($localize`Failed to create product!`);
          }
        }
      });
  }

  private initForm() {
    const form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
    return form;
  }

  private mockForm() {
    this.form.patchValue({
      name: 'Ice cream caramel 650gr',
      description: 'Caramel ice cream with caramel syrup'
    })
  }

}
