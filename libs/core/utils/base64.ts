export class Base64 {

  public static decode(base64: string): string {
    if (typeof atob === 'function') {
      return atob(base64);
    } else if (typeof Buffer === 'function') {
      return Buffer.from(base64, 'base64').toString();
    }
  }

  public static encode(binary: string): string {
    if (typeof btoa === 'function') {
      return btoa(binary);
    } else if (typeof Buffer === 'function') {
      return Buffer.from(binary, 'binary').toString('base64');
    }
  }

}
