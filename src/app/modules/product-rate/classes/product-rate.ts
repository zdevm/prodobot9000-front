import { Currency } from "@shared/enums/currency.enum";
import { Expose } from "class-transformer";
import { Product } from "../../product/classes/product";


export class ProductRate {

  @Expose()
  id!: string;

  @Expose()
  product!: string | Product;

  @Expose()
  currency!: Currency;

  @Expose()
  price!: number;

  @Expose()
  providerSlug!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

}