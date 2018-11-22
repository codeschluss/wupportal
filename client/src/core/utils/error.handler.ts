import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material';
import { inspect } from 'util';
import { ClientErrorComponent } from './error.component';
import { ErrorModel } from './error.model';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements ErrorHandler {

  public static readonly imports = [
    MatDialogModule
  ];

  public constructor(
    private dialog: MatDialog
  ) {
    window.onunhandledrejection = this.handleRejection.bind(this);
  }

  public handleError(error: any): void {
    this.throwError(Object.assign(new ErrorModel(), {
      error: error.constructor.name,
      message: inspect(error),
      path: window.location.pathname,
      status: error.stack
    }));
  }

  public handleRejection(rejection: PromiseRejectionEvent): void {
    this.throwError(Object.assign(new ErrorModel(), {
      error: rejection.reason.constructor.name,
      message: inspect(rejection.reason),
      path: window.location.pathname,
      status: rejection.reason.stack
    }));
  }

  public throwError(error: ErrorModel): void {
    this.dialog.open(ClientErrorComponent, { data: error });
  }

}
