import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Scan } from '@modules/scan/classes/scan';
import { ScanStatus } from '@modules/scan/enums/scan-status.enum';
import { ScanTrigger } from '@modules/scan/enums/scan-trigger.enum';
import { differenceInSeconds, Duration } from 'date-fns';

@Component({
  selector: 'scan-card',
  templateUrl: './scan-card.component.html',
  styleUrls: ['./scan-card.component.scss']
})
export class ScanCardComponent implements OnChanges {
  @Input() scan!: Scan;
  duration?: Duration;
  readonly SCAN_STATUS = ScanStatus;
  readonly SCAN_TRIGGER = ScanTrigger;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scan']) {
      if (!changes['scan'].currentValue) {
        throw new Error('Input property scan is not specified')
      }
      this.duration = this.prepareDuration(this.scan);
    }
  }

  private prepareDuration(scan: Scan): Duration {
    if (!scan.completedAt) {
      return {};
    }
    const secondsDiff = differenceInSeconds(scan.completedAt, scan.createdAt);
    return {
      seconds: Math.floor(secondsDiff % 60),
      hours: Math.floor(secondsDiff / 3600),
      minutes: Math.floor(secondsDiff / 60)
    }
  }

}
