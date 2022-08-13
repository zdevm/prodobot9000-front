import { HelperService } from "@shared/services/helper/helper.service";
import { Expose } from "class-transformer";

export class User {
  private _image?: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  get image() {
    if (!this.firstName || !this.lastName) {
      return null;
    } else if (!this._image) {
      this._image = HelperService.generateImageSrcFromText(`${this.firstName} ${this.lastName}`)
    }
    return this._image;
  }

}