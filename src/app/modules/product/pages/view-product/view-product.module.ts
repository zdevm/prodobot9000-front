import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductComponent } from './view-product.component';
import { RouterModule, Routes } from '@angular/router';
import { FileUploaderModule } from '@modules/file-uploader/file-uploader.module';
import { ProductImageModule } from '@modules/product/components/product-image/product-image.module';

const routes: Routes = [

  {
    path: '',
    component: ViewProductComponent
  }

]

@NgModule({
  declarations: [
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FileUploaderModule,
    ProductImageModule
  ],
  exports: [RouterModule]
})
export class ViewProductModule { }
