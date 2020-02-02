import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { LanguageModel } from '../../../base/models/language.model';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'language-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'locale'">
          <i18n i18n="@@locale">locale</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'machineTranslated'">
          <i18n i18n="@@machineTranslated">machineTranslated</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class LanguageTableComponent extends BaseTable<LanguageModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.name
    },
    {
      name: 'locale',
      value: (item) => item.locale
    },
    {
      name: 'machineTranslated',
      value: (item) => item.machineTranslated
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(LanguageModel);

  protected model: Type<LanguageModel> = LanguageModel;

}
