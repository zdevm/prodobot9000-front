import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploaderStatus } from '@modules/file-uploader/components/single-file-uploader/single-file-uploader.component';
import { ProductService } from '@modules/product/services/product.service';

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

}
