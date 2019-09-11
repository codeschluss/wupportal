import { Component } from '@angular/core';
import { openUrl } from '@wooportal/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { ClientPackage } from '../../utils/package';

@Component({
  styleUrls: ['error.dialog.scss'],
  templateUrl: 'error.dialog.html'
})

export class ErrorDialogComponent {

  public openUrl: Function = openUrl;

  public package: typeof ClientPackage = ClientPackage;

  public constructor(
    public data: ModalDialogParams
  ) { }

}
