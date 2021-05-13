import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  styleUrls: ['minor.popup.sass'],
  templateUrl: 'minor.popup.html'
})

export class MinorPopupComponent {

  public constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    snackbar: MatSnackBarRef<MinorPopupComponent>
  ) {
    setTimeout(() => snackbar.dismiss(), 5000);
  }

}
