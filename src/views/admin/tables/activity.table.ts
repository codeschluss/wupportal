import { Component, Type } from '@angular/core';
import { ActivityModel, CrudJoiner } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'activity-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'address'">
          <i18n>address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'category'">
          <i18n>category</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'contactName'">
          <i18n>contactName</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'organisation'">
          <i18n>organisation</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ActivityTableComponent
  extends BaseTable<ActivityModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.label
    },
    {
      name: 'contactName',
      value: (item) => item.contactName
    },
    {
      name: 'organisation',
      value: (item) => item.membership.organisation.label
    },
    {
      name: 'category',
      value: (item) => item.category.label
    },
    {
      name: 'address',
      value: (item) => item.address.label
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel)
    .with('address').yield('suburb')
    .with('category')
    .with('provider').yield('organisation');

  protected model: Type<ActivityModel> = ActivityModel;

}
