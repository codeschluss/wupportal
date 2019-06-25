import { HttpErrorResponse } from '@angular/common/http';
import { inspect } from 'util';

export class ErrorModel {

  public error: string;
  public message: string;
  public path?: string;
  public raw?: any;
  public status: number = NaN;
  public timestamp: string = new Date().toISOString();
  public trace?: string;

  public static fromError(error: Error & HttpErrorResponse): ErrorModel {
    return Object.assign(new ErrorModel(), {
      error: error.constructor.name,
      message: inspect(error),
      raw: error,
      status: error.status || NaN,
      trace: error.stack
    });
  }

  public static fromRejection(error: PromiseRejectionEvent): ErrorModel {
    return Object.assign(new ErrorModel(), {
      error: error.reason.constructor.name,
      message: inspect(error.reason),
      raw: error,
      status: error.reason.status || NaN,
      trace: error.reason.stack
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

  public get ignored(): boolean {
    switch (true) {
      case this.raw === 'ResizeObserver loop limit exceeded':
      case this.raw.message === 'ResizeObserver loop limit exceeded':
        return true;

      default:
        return false;
    }
  }

}
