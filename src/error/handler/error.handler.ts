import { Location } from '@angular/common';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlatformProvider } from '@wooportal/core';
import { ErrorBarComponent } from '../bar/error.bar';
import { ErrorDialogComponent } from '../dialog/error.dialog';
import { ErrorModel } from '../error.model';
import { ErrorProvider } from '../error.provider';
import { ClientErrorHandler as Compat } from './error.handler.i';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements Compat, ErrorHandler {

  public static instance: ClientErrorHandler;

  public constructor(
    private bar: MatSnackBar,
    private dialog: MatDialog,
    private errorProvider: ErrorProvider,
    private location: Location,
    private platformProvider: PlatformProvider,
    private zone: NgZone
  ) {
    if (Object.keys(this).every(Boolean)) {
      ClientErrorHandler.instance = this;
    }
  }

  public handleError(error: any): void {
    console.error('ClientErrorHandler.handleError', error);
    ClientErrorHandler.instance.throwError(ErrorModel.from(error));
  }

  public throwError(reason: ErrorModel): void {
    reason.client = this.platformProvider.userAgent;
    reason.device = this.platformProvider.platform;
    reason.path = this.location.path(true) || '/';

    if (!reason.ignore) {
      this.zone.run(() => {
        if (reason.breaking) {
          this.errorProvider.throwError(reason).subscribe();
          this.dialog.open(ErrorDialogComponent, { data: reason })
            .afterClosed().subscribe(() => this.platformProvider.reload());
        } else {
          this.bar.openFromComponent(ErrorBarComponent, { data: reason });
        }
      });
    }
  }

}
