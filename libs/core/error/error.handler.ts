import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { inspect } from 'util';
import { ErrorBarComponent } from './error.bar';
import { ErrorDialogComponent } from './error.dialog';
import { ErrorModel } from './error.model';

@Injectable({ providedIn: 'root' })
export class CoreErrorHandler implements ErrorHandler {

  public constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private zone: NgZone
  ) {
    window.onerror = this.handleError.bind(this);
    window.onunhandledrejection = this.handleRejection.bind(this);
  }

  public handleError(error: any): void {
    console.error('CoreErrorHandler.handleError', error);
    this.throwError(Object.assign(new ErrorModel(), {
      error: error.constructor.name,
      message: inspect(error),
      path: window.location.pathname,
      raw: error,
      status: error.status || NaN
    }), error.stack);
  }

  public handleRejection(rejection: PromiseRejectionEvent): void {
    console.error('CoreErrorHandler.handleRejection', rejection);
    this.throwError(Object.assign(new ErrorModel(), {
      error: rejection.reason.constructor.name,
      message: inspect(rejection.reason),
      path: window.location.pathname,
      raw: rejection,
      status: rejection.reason.status || NaN
    }), rejection.reason.stack);
  }

  public showBar(error: ErrorModel, stacktrace?: string): void {
    this.zone.run(() => this.snackbar.openFromComponent(ErrorBarComponent, {
      data: { error: error, stacktrace: stacktrace }, duration: 5000
    }));
  }

  public showDialog(error: ErrorModel, stacktrace?: string): void {
    this.zone.run(() => this.dialog.open(ErrorDialogComponent, {
      data: { error: error, stacktrace: stacktrace }
    }));
  }

  private throwError(error: ErrorModel, stacktrace?: string): void {
    const ignore = 'ResizeObserver loop limit exceeded';
    if (error.raw === ignore || error.raw.message === ignore) { return; }

    switch (error.status) {
      case 403: // HttpStatus.FORBIDDEN
      case 404: // HttpStatus.NOT_FOUND
      case 409: // HttpStatus.CONFLICT
      case 413: // HttpStatus.PAYLOAD_TOO_LARGE
      case 503: // HttpStatus.SERVICE_UNAVAILABLE
        return this.showBar(error, stacktrace);

      default:
        return this.showDialog(error, stacktrace);
    }
  }

}
