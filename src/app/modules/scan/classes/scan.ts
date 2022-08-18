import { ProductRate } from "@modules/product-rate/classes/product-rate";
import { Expose, Type } from "class-transformer";
import { ScanStatus } from "../enums/scan-status.enum";
import { ScanTrigger } from "../enums/scan-trigger.enum";

export class Scan {
  @Expose()
  id!: string;

  @Expose()
  product!: string;

  @Expose()
  status!: ScanStatus;

  @Expose()
  trigger!: ScanTrigger

  @Expose()
  providersToScan!: string[]; // slugs

  @Expose()
  @Type(() => ProductRate)
  rates!: ProductRate[];

  @Expose()
  @Type(() => Date)
  completedAt?: Date;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;
  
}