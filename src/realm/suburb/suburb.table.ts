import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { SuburbModel } from './suburb.model';

@Component({
  selector: 'suburb-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'name'" i18n="@@title">title</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class SuburbTableComponent extends BaseTable<SuburbModel> {

  public columns = [
    {
      name: 'name',
      sort: true,
      value: (item) => item.name
    }
  ];

  protected model: Type<SuburbModel> = SuburbModel;

}
