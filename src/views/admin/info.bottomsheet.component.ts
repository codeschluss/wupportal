import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'info-bottom-sheet',
  template: `
  <div [style.height]="'30vh'">
    <span mat-line><i18n i18n="'@@' + message">{{message}}</i18n></span>
  </div>`
})

export class InfoBottomComponent {

    public message: string;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private bottomSheetRef: MatBottomSheetRef<InfoBottomComponent>) {
        this.message = data.message;
    }
}
