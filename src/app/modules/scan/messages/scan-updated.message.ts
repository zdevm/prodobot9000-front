import { Expose } from "class-transformer";
import { Scan } from "../classes/scan";

export class ScanUpdatedMessage {
  @Expose()
  scan!: Scan;

  static getType() {
    return 'ScanUpdated';
  }

}