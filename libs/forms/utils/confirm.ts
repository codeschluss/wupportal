import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CrudModel } from '@portal/core';

@Component({
  template: `
    <h1 mat-dialog-title>
      <i18n i18n="@@pleaseConfirm">pleaseConfirm</i18n>
    </h1>
    <div mat-dialog-content>
      <mat-list>
        <mat-list-item>
          <strong mat-line>{{ item.name }}</strong>
          <em mat-line><i18n i18n="@@title">title</i18n></em>
        </mat-list-item>
        <mat-list-item *ngIf="item.description">
          <strong mat-line>{{ item.description }}</strong>
          <em mat-line><i18n i18n="@@description">description</i18n></em>
        </mat-list-item>
        <mat-list-item>
          <strong mat-line>{{ item.id }}</strong>
          <em mat-line><i18n i18n="@@uuid">uuid</i18n></em>
        </mat-list-item>
      </mat-list>
    </div>
    <div mat-dialog-actions>
      <button mat-button color="warn" [mat-dialog-close]="true">
        <i18n i18n="@@confirm">confirm</i18n>
      </button>
      <button mat-button [mat-dialog-close]="false">
        <i18n i18n="@@cancel">cancel</i18n>
      </button>
    </div>
  `,
  styles: [
    'h1 { color: red; }'
  ]
})

export class ConfirmDialogComponent {

  public constructor(
    @Inject(MAT_DIALOG_DATA)
    public item: CrudModel & any
  ) { }

}
