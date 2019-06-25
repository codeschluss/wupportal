import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientPackage } from '../../utils/package';

@Component({
  styleUrls: ['error.dialog.scss'],
  templateUrl: 'error.dialog.html'
})

export class ErrorDialogComponent {

  public package = ClientPackage;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}
