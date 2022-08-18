import { Pipe, PipeTransform } from '@angular/core';
import { intlFormatDistance } from 'date-fns'

@Pipe({
  name: 'humanizeTimeDiff'
})
export class HumanizeTimeDiffPipe implements PipeTransform {

  transform(payload: { dateA: Date, dateB?: Date }, ...args: unknown[]): string {
    return intlFormatDistance(payload.dateA, payload.dateB || new Date()) 
  }

}
