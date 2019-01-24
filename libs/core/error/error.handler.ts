import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { inspect } from 'util';
import { ErrorDialogComponent } from './error.dialog';
import { ErrorModel } from './error.model';

@Injectable({ providedIn: 'root' })
export class CoreErrorHandler implements ErrorHandler {

  public constructor(
    private dialog: MatDialog,
    private zone: NgZone
  ) {
    window.onerror = this.handleError.bind(this);
    window.onunhandledrejection = this.handleRejection.bind(this);
  }

  public handleError(error: any): void {
    if (
      error === 'ResizeObserver loop limit exceeded' ||
      error.message === 'ResizeObserver loop limit exceeded'
    ) { return; }

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
    const data = { error: error, stacktrace: stacktrace };
    this.zone.run(() => this.dialog.open(ErrorDialogComponent, { data: data }));
  }

}
