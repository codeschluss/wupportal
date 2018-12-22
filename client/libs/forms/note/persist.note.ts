import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  styles: [
    '.false { color: red; }',
    '.true { color: green; }'
  ],
  template: `
    <ng-container *ngIf="data.error; then false; else true"></ng-container>
    <ng-container *ngIf="data.title">
      <i18n i18n="@@title">title</i18n>: {{ data.title }}
    </ng-container>

    <ng-template #false>
      <strong style="color: red;">
        <i18n i18n="persistError">persistError</i18n>
      </strong>
    </ng-template>
    <ng-template #true>
      <strong style="color: green;">
        <i18n i18n="persistSuccess">persistSuccess</i18n>
      </strong>
    </ng-template>
  `,
})
export class PersistNoteComponent {

  public constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: any
  ) { }

}
