import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  styles: [`
    strong { color: red; font-weight: bold }
  `],
  template: `
    <strong class="mat-body-strong">
      <ng-container *ngTemplateOutlet="label; context: { case: data.error }">
      </ng-container>
    </strong>
    <br>
    <small class="mat-small">
      ({{ data.error.raw.error.message }})
    </small>

    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.status">
        <ng-container *ngSwitchCase="'403'">
          <i18n i18n="@@apiErrorForbidden">apiErrorForbidden</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'404'">
          <i18n i18n="@@apiErrorNotFound">apiErrorNotFound</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'409'">
          <i18n i18n="@@apiErrorConflict">apiErrorConflict</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'413'">
          <i18n i18n="@@apiErrorTooLarge">apiErrorTooLarge</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'503'">
          <i18n i18n="@@apiErrorUnavaliable">apiErrorUnavaliable</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `
})
export class ErrorBarComponent {

  public constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

}
