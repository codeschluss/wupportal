import { Location } from '@angular/common';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { ErrorModel, ErrorProvider, PlatformProvider } from '../../core';
import { FatalPopupComponent } from './popups/fatal/fatal.popup';
import { MinorPopupComponent } from './popups/minor/minor.popup';

@Injectable({
  providedIn: 'root'
})

export class ClientErrorHandler
  implements ErrorHandler {

  private static self: ClientErrorHandler;

  public constructor(
    private dialog: MatDialog,
    private errorProvider: ErrorProvider,
    private location: Location,
    private ngZone: NgZone,
    private platformProvider: PlatformProvider,
    private snackBar: MatSnackBar
  ) {
    if (Object.keys(this).every(Boolean)) {
      ClientErrorHandler.self = this;
    }
  }

  public handleError(error: any): void {
    const item = ErrorModel.from(error);
    const self = ClientErrorHandler.self;
    item.path = self.location.path(true) || '/';
    item.userAgent = self.platformProvider.userAgent;

    switch (true) {
      default:
        console.warn('ClientErrorHandler.handleError', item.raw);
        self.ngZone.run(() => {
          self.snackBar.openFromComponent(MinorPopupComponent, { data: item });
        });
        break;

      case item.fatal:
        console.error('ClientErrorHandler.handleError', item.raw);
        self.ngZone.run(() => forkJoin([
          self.errorProvider.throwError(item),
          self.dialog.open(FatalPopupComponent, {
            data: item,
            disableClose: true
          }).afterClosed()
        ]).subscribe(() => self.platformProvider.reload()));
        break;

      case item.ignore:
        break;
    }
  }

}
