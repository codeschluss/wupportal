import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { DeviceProvider } from '@wooportal/app';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ErrorHandler, setErrorHandler } from 'tns-core-modules/trace';
import { alert } from 'tns-core-modules/ui/dialogs';
import { ErrorModel } from '../../../base/models/error.model';
import { ErrorProvider } from '../../../base/providers/error.provider';
import { NativeComponent } from '../../../native.component';
import { FatalPopupComponent } from '../popups/fatal/fatal.popup';
import { ClientErrorHandler as Compat } from './error.handler.i';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements Compat, ErrorHandler {

  public static instance: ClientErrorHandler;

  public handlerError: (error: Error) => void = this.handleError.bind(this);

  public constructor(
    private deviceProvider: DeviceProvider,
    private dialog: ModalDialogService,
    private errorProvider: ErrorProvider,
    private location: Location,
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
    reason.client = this.deviceProvider.agent;
    reason.device = this.deviceProvider.apparat;
    reason.path = this.location.path(true) || '/';

    if (!reason.ignore) {
      this.zone.run(() => {
        if (reason.fatal) {
          this.errorProvider.broadcast.next(reason);
          this.dialog.showModal(FatalPopupComponent, {
            context: reason,
            viewContainerRef: NativeComponent.viewContainer
          }).then(() => this.deviceProvider.reload());
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
