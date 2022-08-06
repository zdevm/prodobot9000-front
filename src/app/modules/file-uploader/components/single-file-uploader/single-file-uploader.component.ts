import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploaderService } from '@modules/file-uploader/services/file-uploader.service';

export type UploaderStatus = 'pending' | 'uploading' | 'succeeded' | 'failed';

@Component({
  selector: 'single-file-uploader',
  templateUrl: './single-file-uploader.component.html',
  styleUrls: ['./single-file-uploader.component.scss']
})
export class SingleFileUploaderComponent {
  @Input() label: string = $localize`Drop a file`;
  @Output() fileUploaded = new EventEmitter<string>();
  @Output() statusUpdated = new EventEmitter<UploaderStatus>();

  status: UploaderStatus = 'pending';

  public constructor(private fileService: FileUploaderService) {}

  onSelect(event: any) {
    this.setStatus('uploading')
    this.fileService.uploadSingle(event.addedFiles[0]).subscribe({
      next: id => {
        this.setStatus('succeeded')
        this.fileUploaded.emit(id);
      },
      error: err => {
        this.setStatus('failed')
      }
    });
  }

  setStatus(status: UploaderStatus) {
    this.status = status;
    this.statusUpdated.emit(status);
  }

}
