import { Pipe, PipeTransform } from '@angular/core';
import { Duration, formatDuration } from 'date-fns'

interface Options {
  format?: string[];
  zero?: boolean;
  delimiter?: string;
  locale?: Locale;
}

@Pipe({
  name: 'humanizeDuration'
})
export class HumanizeDurationPipe implements PipeTransform {

  transform(duration: Duration, ...args: any[] ): string {
    const options: Options | undefined = args?.[0];
    return formatDuration(duration, options);
  }

}
