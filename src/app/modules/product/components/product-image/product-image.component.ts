import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploaderStatus } from '@modules/file-uploader/components/single-file-uploader/single-file-uploader.component';
import { ProductService } from '@modules/product/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent {
  @Input() canEdit: boolean = false;
  @Input() fileId?: string;
  @Output() imageSaved = new EventEmitter<string>();

  showControls = false;
  isEditing = false;
  showEditorTools = false;

  constructor(private productService: ProductService) { }

  onHoverIn() {
    this.showControls = true;
  }

  onHoverOut() {
    this.showControls = false;
  }

  onFileUploaded(fileId: string) {
    this.imageSaved.emit(fileId);
  }

  onEditBtn() {
    this.showEditorTools = true;
    this.isEditing = true;
  }

  onCloseBtn() {
    this.isEditing = false;
  }

  onUploaderStatus(status: UploaderStatus) {
    switch (status) {
      case 'uploading': {
        this.showEditorTools = false;
        break;
      }
      case 'pending':
      case 'failed': {
        this.showEditorTools = true;
        this.alertFail();
        this.onCloseBtn();
        break;
      }
      case 'succeeded': {
        this.showEditorTools = false;
        this.isEditing = false;
        this.showControls = true;
        break;
      }
    }
  }

  private alertFail() {
    Swal.fire({
      icon: 'warning',
      title: $localize`Failed to upload image!`,
      text: $localize`Please check that the input file is no bigger than 3MB and it's type is .jpg, .jpeg or .png`
    })
  }

}
