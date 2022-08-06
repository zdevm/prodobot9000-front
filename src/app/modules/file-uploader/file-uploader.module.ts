import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SingleFileUploaderComponent } from './components/single-file-uploader/single-file-uploader.component';



@NgModule({
  declarations: [
    SingleFileUploaderComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule
  ],
  exports: [SingleFileUploaderComponent]
})
export class FileUploaderModule { }
