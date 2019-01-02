import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <h1 mat-dialog-title>
      <i18n i18n="@@selectAddress">selectAddress</i18n>
    </h1>
    <section mat-dialog-content>
      <mat-action-list>
        <ng-container *ngFor="let item of data">
          <mat-list-item (click)="dialog.close(item)">
            <strong mat-line>
              {{ item.street || '?' }}
              {{ item.houseNumber || '?' }},
              {{ item.postalCode || '?' }}
              {{ item.place || '?' }}
            </strong>
            <em mat-line>
              {{ item.longitude }},
              {{ item.latitude }}
            </em>
          </mat-list-item>
        </ng-container>
      </mat-action-list>
    </section>
    <section mat-dialog-actions>
      <button mat-button mat-dialog-close>
        <i18n i18n="@@close">close</i18n>
      </button>
    </section>
  `
})

export class LocationDialogComponent {

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<LocationDialogComponent>
  ) { }

}
