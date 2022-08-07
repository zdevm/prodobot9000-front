import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncButtonModule } from '@shared/directives/async-button/async-button.module';



@NgModule({
  declarations: [
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncButtonModule
  ],
  exports: [EditProductComponent]
})
export class EditProductModule { }
