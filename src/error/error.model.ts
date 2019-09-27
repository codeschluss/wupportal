import { inspect } from 'util';

export class ErrorModel {

  public error: string;
  public message: string;
  public path?: string;
  public raw?: any;
  public status: number = NaN;
  public timestamp: string = new Date().toISOString();
  public trace?: string;

  public static from(error: any): ErrorModel {
    return Object.assign(new ErrorModel(), {
      error: error.constructor.name,
      message: error.status ? error.error.message : error.message,
      path: error.url,
      raw: error,
      status: error.status || NaN,
      trace: error.stack || inspect(error)
    });
  }

  public get breaking(): boolean {
    switch (this.status) {
      case 403: // HttpStatus.FORBIDDEN
      case 404: // HttpStatus.NOT_FOUND
      case 409: // HttpStatus.CONFLICT
      case 413: // HttpStatus.PAYLOAD_TOO_LARGE
      case 503: // HttpStatus.SERVICE_UNAVAILABLE
        return false;

      default:
        return true;
    }
  }

  public get ignore(): boolean {
    switch (true) {
      case this.raw === 'ResizeObserver loop limit exceeded':
      case this.raw.message === 'ResizeObserver loop limit exceeded':
        return true;

      default:
        return false;
    }
  }

}
