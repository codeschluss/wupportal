import { Location } from '@angular/common';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlatformProvider } from '@wooportal/core';
import { ErrorBarComponent } from '../bar/error.bar';
import { ErrorDialogComponent } from '../dialog/error.dialog';
import { ErrorModel } from '../error.model';
import { ClientErrorHandler as Compat } from './error.handler.i';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements Compat, ErrorHandler {

  public constructor(
    private bar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private zone: NgZone,
    platformProvider: PlatformProvider
  ) {
    if (platformProvider.name === 'Web') {
      addEventListener('error', this.handleError.bind(this));
      addEventListener('unhandledrejection', this.handleRejection.bind(this));
    }
  }

  public handleError(error: any): void {
    console.error('ClientErrorHandler.handleError', error);
    this.throwError(ErrorModel.fromError(error));
  }

  public handleRejection(error: PromiseRejectionEvent): void {
    console.error('ClientErrorHandler.handleRejection', error);
    this.throwError(ErrorModel.fromRejection(error));
  }

  public throwError(error: ErrorModel): any {
    error.path = this.location.path(true) || '/';

    if (!error.ignored) {
      this.zone.run(() => error.breaking
        ? this.dialog.open(ErrorDialogComponent, { data: error })
        : this.bar.openFromComponent(ErrorBarComponent, { data: error }));
    }
  }

}
