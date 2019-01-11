import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { ActivityModel } from './activity.model';

@Component({
  selector: 'activity-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'address'">
          <i18n i18n="@@address">address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'category'">
          <i18n i18n="@@category">category</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'contactName'">
          <i18n i18n="@@contactName">contactName</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'organisation'">
          <i18n i18n="@@organisation">organisation</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ActivityTableComponent extends BaseTable<ActivityModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.name
    },
    {
      name: 'contactName',
      value: (item) => item.contactName
    },
    {
      name: 'organisation',
      value: (item) => item.provider.organisation.name
    },
    {
      name: 'category',
      value: (item) => item.category.name
    },
    {
      name: 'address',
      // TODO: non-optional address
      value: (item) => item.address ? item.address.name : ''
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel)
    .with('address').yield('suburb')
    .with('category')
    .with('provider').yield('organisation');

  protected model: Type<ActivityModel> = ActivityModel;

}
