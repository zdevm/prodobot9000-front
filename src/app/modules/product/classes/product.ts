import { RateProviderForm } from "@modules/rate-provider/interfaces/form-options.interface";
import { Expose } from "class-transformer";


export class Product {

  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public providers!: string[]; // configured providers' slugs

  @Expose()
  public providersForms!: {
    [key: string]: { // provider's slug
      getProduct: RateProviderForm;
    }
  }

  @Expose()
  image?: string; // file ID

}