import { Component } from '@angular/core';
import { ApplicationSettings, openUrl } from '@wooportal/app';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  styleUrls: ['fatal.popup.scss'],
  templateUrl: 'fatal.popup.html'
})

export class FatalPopupComponent {

  public openUrl: (url: string) => boolean = openUrl;

  public constructor(
    public app: ApplicationSettings,
    public data: ModalDialogParams
  ) { }

}
