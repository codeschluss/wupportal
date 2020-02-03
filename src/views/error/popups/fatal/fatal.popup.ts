import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApplicationSettings } from '@wooportal/app';

@Component({
  styleUrls: ['fatal.popup.scss'],
  templateUrl: 'fatal.popup.html'
})

export class FatalPopupComponent {

  public constructor(
    public app: ApplicationSettings,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}
