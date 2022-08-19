import { Expose, Type } from "class-transformer";
import { Scan } from "../classes/scan";

export class ScanUpdatedMessage {
  @Expose()
  @Type(() => Scan)
  scan!: Scan;

  static getType() {
    return 'ScanUpdated';
  }

}