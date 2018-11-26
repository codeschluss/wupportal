import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material';
import { inspect } from 'util';
import { ErrorDialogComponent } from './error.dialog';
import { ErrorModel } from './error.model';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements ErrorHandler {

  public static readonly imports = [
    MatDialogModule
  ];

  public constructor(
    private dialog: MatDialog
  ) {
    window.onerror = this.handleError.bind(this);
    window.onunhandledrejection = this.handleRejection.bind(this);
  }

  public handleError(error: any): void {
    console.error(error);
    this.throwError(Object.assign(new ErrorModel(), {
      error: error.constructor.name,
      message: inspect(error),
      path: window.location.pathname,
    }), error.stack);
  }

  public handleRejection(rejection: PromiseRejectionEvent): void {
    console.error(rejection);
    this.throwError(Object.assign(new ErrorModel(), {
      error: rejection.reason.constructor.name,
      message: inspect(rejection.reason),
      path: window.location.pathname,
    }), rejection.reason.stack);
  }

  public throwError(error: ErrorModel, stacktrace?: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        error: error,
        stacktrace: stacktrace || null
      }
    });
  }

}
