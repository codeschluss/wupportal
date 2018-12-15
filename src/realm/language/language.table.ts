import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { LanguageModel } from './language.model';

@Component({
  selector: 'language-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'locale'" i18n="@@locale">locale</i18n>
        <i18n *ngSwitchCase="'machineTranslated'"
          i18n="@@title">machineTranslated</i18n>
        <i18n *ngSwitchCase="'name'" i18n="@@title">title</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class LanguageTableComponent extends BaseTable<LanguageModel> {

  public columns = [
    {
      name: 'name',
      sort: true,
      value: (item) => item.name
    },
    {
      name: 'locale',
      sort: true,
      value: (item) => item.locale
    },
    {
      name: 'machineTranslated',
      sort: true,
      value: (item) => item.machineTranslated
    }
  ];

  protected model: Type<LanguageModel> = LanguageModel;

}
