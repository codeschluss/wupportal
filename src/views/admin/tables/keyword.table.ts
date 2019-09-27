import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { BaseTable, TableColumn } from '@wooportal/forms';
import { KeywordModel } from '../../../realm/models/keyword.model';

@Component({
  selector: 'keyword-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class KeywordTableComponent extends BaseTable<KeywordModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.name
    },
    {
      name: 'description',
      value: (item) => item.description
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(KeywordModel);

  protected model: Type<KeywordModel> = KeywordModel;

}
