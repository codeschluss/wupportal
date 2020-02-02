import { Location } from '@angular/common';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceProvider } from '@wooportal/app';
import { ErrorModel } from '../../../base/models/error.model';
import { ErrorProvider } from '../../../base/providers/error.provider';
import { FatalPopupComponent } from '../popups/fatal/fatal.popup';
import { MinorPopupComponent } from '../popups/minor/minor.popup';
import { ClientErrorHandler as Compat } from './error.handler.i';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements Compat, ErrorHandler {

  public static instance: ClientErrorHandler;

  public constructor(
    private bar: MatSnackBar,
    private deviceProvider: DeviceProvider,
    private dialog: MatDialog,
    private errorProvider: ErrorProvider,
    private location: Location,
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
    reason.client = this.deviceProvider.agent;
    reason.device = this.deviceProvider.apparat;
    reason.path = this.location.path(true) || '/';

    if (!reason.ignore) {
      this.zone.run(() => {
        if (reason.fatal) {
          this.errorProvider.broadcast.next(reason);
          this.dialog.open(FatalPopupComponent, { data: reason })
            .afterClosed().subscribe(() => this.deviceProvider.reload());
        } else {
          this.bar.openFromComponent(MinorPopupComponent, { data: reason });
        }
      });
    }
  }

}
