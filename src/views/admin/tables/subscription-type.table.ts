import { Component, Type } from '@angular/core';
import { CrudJoiner, SubscriptionTypeModel } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'subscription-type-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SubscriptionTypeTableComponent
  extends BaseTable<SubscriptionTypeModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.label
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SubscriptionTypeModel);

  protected model: Type<SubscriptionTypeModel> = SubscriptionTypeModel;

}
