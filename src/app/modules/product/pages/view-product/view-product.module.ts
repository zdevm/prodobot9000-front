import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductComponent } from './view-product.component';
import { RouterModule, Routes } from '@angular/router';
import { FileUploaderModule } from '@modules/file-uploader/file-uploader.module';
import { ProductImageModule } from '@modules/product/components/product-image/product-image.module';
import { UrlFormControlModule } from '@modules/rate-provider/components/url-form-control/url-form-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ProviderFormModule } from '@modules/rate-provider/components/provider-form/provider-form.module';
import { SetupProviderModule } from '@modules/product/components/setup-provider/setup-provider.module';

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
    ProductImageModule,
    UrlFormControlModule,
    ReactiveFormsModule,
    NgbModalModule,
    ProviderFormModule,
    SetupProviderModule
  ],
  exports: [RouterModule]
})
export class ViewProductModule { }
