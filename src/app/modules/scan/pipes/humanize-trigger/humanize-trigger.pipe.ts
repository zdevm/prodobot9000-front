import { Pipe, PipeTransform } from '@angular/core';
import { ScanTrigger } from '@modules/scan/enums/scan-trigger.enum';

@Pipe({
  name: 'humanizeScanTrigger'
})
export class HumanizeTriggerPipe implements PipeTransform {

  transform(trigger: ScanTrigger, ...args: unknown[]): unknown {
    switch (trigger) {
      case ScanTrigger.Manual: return $localize`Initiated manually`;
      case ScanTrigger.Schedule: return $localize`Scheduled action`;
      default: return $localize`Unknown`;
    }
  }

}
