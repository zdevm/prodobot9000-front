import { Expose } from "class-transformer";

export class Pagination<T> {

  @Expose()
  public docs!: T[];
  @Expose()
  public total!: number;
  @Expose()
  public limit!: number;
  @Expose()
  public offset!: number;

  @Expose()
  public totalPages!: number;
  @Expose()
  public page!: number; // current page

}