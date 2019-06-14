export class Base64 {

  public static decode(base64: string): string {
    switch (true) {
      case typeof atob === 'function': return atob(base64);
      case typeof Buffer === 'function':
        return Buffer.from(base64, 'base64').toString();
    }
  }

  public static encode(binary: string): string {
    switch (true) {
      case typeof btoa === 'function': return btoa(binary);
      case typeof Buffer === 'function':
        return Buffer.from(binary, 'binary').toString('base64');
    }
  }

}
