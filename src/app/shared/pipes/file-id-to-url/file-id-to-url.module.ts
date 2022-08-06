import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileIdToUrlPipe } from './file-id-to-url.pipe';



@NgModule({
  declarations: [
    FileIdToUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [FileIdToUrlPipe]
})
export class FileIdToUrlModule { }
