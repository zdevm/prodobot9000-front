export type CreateProductDtoConstructInput = CreateProductDto;

export class CreateProductDto {
  public name: string;
  public description: string = '';

  public constructor(input: CreateProductDtoConstructInput) {
    this.name = input.name;
    this.description = input.description;
  }

}