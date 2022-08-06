import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImageComponent } from './product-image.component';
import { FileIdToUrlModule } from '@shared/pipes/file-id-to-url/file-id-to-url.module';
import { FileUploaderModule } from '@modules/file-uploader/file-uploader.module';



@NgModule({
  declarations: [ProductImageComponent],
  imports: [
    CommonModule,
    FileIdToUrlModule,
    FileUploaderModule
  ],
  exports: [ProductImageComponent]
})
export class ProductImageModule { }
