import { Pipe, PipeTransform } from '@angular/core';
import { ScanStatus } from '@modules/scan/enums/scan-status.enum';

@Pipe({
  name: 'humanizeScanStatus'
})
export class HumanizeStatusPipe implements PipeTransform {

  transform(status: ScanStatus, ...args: unknown[]): string {
    switch (status) {
      case ScanStatus.Failed: return $localize`Failed`;
      case ScanStatus.Succeeded: return $localize`Completed`;
      case ScanStatus.Pending: return $localize`Waiting`;
      case ScanStatus.Scanning: return $localize`Scanning`;
      default: return $localize`Unknown status`;
    }
  }

}
