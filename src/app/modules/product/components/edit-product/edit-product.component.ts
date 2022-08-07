import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '@modules/product/classes/product';
import { ProductService } from '@modules/product/services/product.service';
import { HelperService } from '@shared/services/helper/helper.service';
import { update } from 'lodash-es';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnChanges {
  @Input() product?: Product;
  @Output() productUpdated = new EventEmitter<Product>();
  saveBtnLoader = false;
  form: FormGroup;

  constructor(private readonly productService: ProductService,
              private readonly fb: FormBuilder) {
    this.form = this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']?.currentValue) {
      this.form.patchValue(changes['product'].currentValue);
    }
  }

  onSubmit() {
    const productId = HelperService.id(this.product);
    if (!productId) {
      // TODO handle error
      return;
    }
    this.updateProduct(productId, this.form.value)
        .subscribe(updatedProduct => this.productUpdated.emit(updatedProduct));
  }

  updateProduct(id: string, partial: Partial<Product>) {
    this.saveBtnLoader = true;
    return this.productService.updateById(id, partial).pipe(finalize(() => this.saveBtnLoader = false))
  }

  private initForm() {
    const form = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    })
    return form;
  }

}
