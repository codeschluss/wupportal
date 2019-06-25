import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { openUrl } from 'tns-core-modules/utils/utils';
import { ClientPackage } from '../../utils/package';

@Component({
  styleUrls: ['error.dialog.scss'],
  templateUrl: 'error.dialog.html'
})

export class ErrorDialogComponent {

  public openUrl = openUrl;

  public package = ClientPackage;

  public constructor(
    public data: ModalDialogParams
  ) { }

}
