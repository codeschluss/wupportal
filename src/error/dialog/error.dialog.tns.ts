import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { ClientPackage } from '../../utils/package';
import { openUrl } from '../../views/shared/shared.imports';

@Component({
  styleUrls: ['error.dialog.scss'],
  templateUrl: 'error.dialog.html'
})

export class ErrorDialogComponent {

  public openUrl: (url: string) => boolean = openUrl;

  public package: typeof ClientPackage = ClientPackage;

  public constructor(
    public data: ModalDialogParams
  ) { }

}
