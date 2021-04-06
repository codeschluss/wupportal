export class Base64 {

  public static decode(data: string): string {
    switch (true) {
      case typeof atob === 'function':
        return atob(data);

      case typeof Buffer === 'function':
        return Buffer.from(data, 'base64').toString();
    }
  }

  public static encode(data: string): string {
    switch (true) {
      case typeof btoa === 'function':
        return btoa(data);

      case typeof Buffer === 'function':
        return Buffer.from(data, 'binary').toString('base64');
    }
  }

}
