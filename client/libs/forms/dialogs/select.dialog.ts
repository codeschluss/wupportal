import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <h1 mat-dialog-title>
      <i18n i18n="@@pleaseSelect">pleaseSelect</i18n>
    </h1>
    <section mat-dialog-content>
      <ng-container *ngIf="data.items.length">
        <mat-action-list>
          <ng-container *ngFor="let item of data.items">
            <mat-list-item (click)="dialog.close(item)">
              {{ data.label(item) }}
            </mat-list-item>
          </ng-container>
        </mat-action-list>
      </ng-container>
      <ng-container *ngIf="!data.items.length">
        <i18n i18n="@@nothingFound">nothingFound</i18n>
      </ng-container>
    </section>
    <section mat-dialog-actions>
      <button mat-button mat-dialog-close>
        <i18n i18n="@@cancel">cancel</i18n>
      </button>
    </section>
  `
})

export class SelectDialogComponent {

  public constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,

    public dialog: MatDialogRef<SelectDialogComponent>
  ) { }


}
