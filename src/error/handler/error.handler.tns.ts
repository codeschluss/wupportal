import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { on, UnhandledErrorEventData } from 'tns-core-modules/application';
import { ErrorHandler, setErrorHandler } from 'tns-core-modules/trace/trace';
import { alert } from 'tns-core-modules/ui/dialogs';
import { ErrorDialogComponent } from '../dialog/error.dialog';
import { ErrorModel } from '../error.model';
import { ClientErrorHandler as Compat } from './error.handler.i';

@Injectable({ providedIn: 'root' })
export class ClientErrorHandler implements Compat, ErrorHandler {

  public constructor(
    private dialog: ModalDialogService,
    private location: Location,
    private zone: NgZone,
  ) {
    setErrorHandler(this);
    on('uncaughtError', this.handlerNative.bind(this));
  }

  public handlerError(error: any) {
    console.error('ClientErrorHandler.handlerError', error);
    this.throwError(ErrorModel.fromError(error));
  }

  public handlerNative(error: UnhandledErrorEventData): void {
    console.error('ClientErrorHandler.handlerNative', error);
    // TODO: promise rejections, transformation and reporting
  }

  // public handlerRejection(error: PromiseRejectionEvent): void {
  //   console.error('ClientErrorHandler.handlerRejection', error);
  //   this.throwError(ErrorModel.fromRejection(error));
  // }

  public throwError(error: ErrorModel): void {
    error.path = this.location.path(true) || '/';

    if (!error.ignored) {
      this.zone.run(() => error.breaking
        ? alert({ title: error.error, message: error.message })
        : this.dialog.showModal(ErrorDialogComponent, { context: error }));
    }
  }

}
