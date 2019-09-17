import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  styleUrls: ['error.bar.scss'],
  templateUrl: 'error.bar.html'
})

export class ErrorBarComponent {

  public constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    snackbar: MatSnackBarRef<ErrorBarComponent>
  ) {
    setTimeout(() => snackbar.dismiss(), 5000);
  }

}
