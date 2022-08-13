import invert from 'invert-color';

export class HelperService {
  static isDevMode = false;

  /**
   * Return object's identifier
   * @param object Object has id or _id property
   * @returns 
   */
  static id(object?: any): string | undefined {
    if (!object) {
      return undefined;
    }
    return (object.id || object._id || object)?.toString() || object;
  }

  /**
   * Checks if specified value is falsy or non-object type or empty object
   * @param obj 
   * @returns 
   */
  static isEmptyObject(obj?: object) {
    return !obj || (typeof obj !== 'object') || !Object.keys(obj).length
  }

  /**
   * Put @val in array.
   * @returns If val is array or falsy, return val - else [val] 
  */
  static toArray<T>(val: any): T[] {
    if (!val || Array.isArray(val)) {
      return val;
    }
    return [val];
  }

  static toColorHex(text: string) {
    let h = 0;
    for (let i = 0; i < text.length; i++) {
      h = text.charCodeAt(i) + ((h << 5) - h);
    }
    let color = '';
    for (let i = 0; i < 3; i++) {
      const value = (h >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  static invertColor(hex: string) {
    const hasHash = hex.charAt(0) === '#';
    hex = hasHash ? hex : '#' + hex;
    const inverted = invert(hex);
    return hasHash ? inverted : inverted.substring(1);
  }

  static generateImageSrcFromText(text: string) {
    const mainUrl = 'https://ui-avatars.com/api/';
    const bgHex = HelperService.toColorHex(text);
    const colorHex = HelperService.invertColor(bgHex);
    const queryParams = [
      `name=${text.split(' ').join('+')}`,
      `background=${bgHex}`,
      `color=${colorHex}`
    ].join('&')
    return `${mainUrl}?${queryParams}`
  }

}