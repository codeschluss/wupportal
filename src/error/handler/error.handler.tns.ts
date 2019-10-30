import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { PlatformProvider } from '@wooportal/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ErrorHandler, setErrorHandler } from 'tns-core-modules/trace';
import { alert } from 'tns-core-modules/ui/dialogs';
import { NativeComponent } from '../../native.component.tns';
import { ErrorDialogComponent } from '../dialog/error.dialog';
import { ErrorModel } from '../error.model';
import { ErrorProvider } from '../error.provider';
import { ClientErrorHandler as Compat } from './error.handler.i';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements Compat, ErrorHandler {

  public static instance: ClientErrorHandler;

  public handlerError: (error: Error) => void = this.handleError.bind(this);

  public constructor(
    private dialog: ModalDialogService,
    private errorProvider: ErrorProvider,
    private location: Location,
    private platformProvider: PlatformProvider,
    private zone: NgZone
  ) {
    if (Object.keys(this).every(Boolean)) {
      setErrorHandler(ClientErrorHandler.instance = this);
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
          this.dialog.showModal(ErrorDialogComponent, {
            context: reason,
            viewContainerRef: NativeComponent.viewContainer
          }).then(() => this.platformProvider.reload());
        } else {
          alert({
            title: reason.error,
            message: reason.message,
            okButtonText: 'OK'
          });
        }
      });
    }
  }

}
