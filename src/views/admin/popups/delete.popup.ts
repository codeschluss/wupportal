import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  template: `
    <h2 mat-dialog-title>
      <i18n i18n="@@confirmDelete">confirmDelete</i18n>
    </h2>
    <section mat-dialog-content>
      <mat-list>
        <mat-list-item>
          <strong mat-line>{{ data.item.name }}</strong>
          <em mat-line><i18n i18n="@@name">name</i18n></em>
        </mat-list-item>
        <mat-list-item>
          <strong mat-line>{{ data.item.id }}</strong>
          <em mat-line><i18n i18n="@@uuid">uuid</i18n></em>
        </mat-list-item>
      </mat-list>
    </section>
    <section mat-dialog-actions>
      <button mat-button mat-dialog-close>
        <i18n i18n="@@close">close</i18n>
      </button>
      <button mat-button color="warn" [mat-dialog-close]="true">
        <i18n i18n="@@delete">delete</i18n>
      </button>
    </section>
  `
})

export class DeletePopupComponent {

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}
