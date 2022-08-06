import { Pipe, PipeTransform } from '@angular/core';
import { FileService } from '@shared/services/file/file.service';

@Pipe({
  name: 'fileIdToUrl'
})
export class FileIdToUrlPipe implements PipeTransform {

  constructor(private readonly fileService: FileService) { }

  transform(fileId: string, ...args: any[]): string {
    return this.fileService.getFileUrl(fileId);
  }

}
