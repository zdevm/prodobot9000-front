import { Expose } from "class-transformer";

export class RateProvider {

    @Expose()
    name!: string;

    @Expose()
    description!: string;

    @Expose()
    slug!: string;

}