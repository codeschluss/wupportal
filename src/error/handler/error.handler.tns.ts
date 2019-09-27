import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ErrorHandler, setErrorHandler } from 'tns-core-modules/trace';
import { alert } from 'tns-core-modules/ui/dialogs';
import { ErrorDialogComponent } from '../dialog/error.dialog';
import { ErrorModel } from '../error.model';
import { ErrorProvider } from '../error.provider';
import { ClientErrorHandler as Compat } from './error.handler.i';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements Compat, ErrorHandler {

  public handlerError: (error: Error) => void = this.handleError.bind(this);

  public constructor(
    private dialog: ModalDialogService,
    private errorProvider: ErrorProvider,
    private location: Location,
    private zone: NgZone
  ) {
    setErrorHandler(this);
  }

  public handleError(error: any): void {
    console.error('ClientErrorHandler.handleError', error);
    this.throwError(ErrorModel.from(error));
  }

  public throwError(reason: ErrorModel): void {
    reason.path = this.location.path(true) || '/';

    if (!reason.ignore) {
      this.errorProvider.throwError(reason);
      this.zone.run(() => !reason.breaking || true ? alert({
        title: reason.error,
        message: reason.message,
        okButtonText: 'Close'
      }) : this.dialog.showModal(ErrorDialogComponent, {
        context: reason,
        // TODO: global ViewContainerRef
        viewContainerRef: null
      }));
    }
  }

}
