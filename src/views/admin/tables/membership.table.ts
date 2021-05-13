import { Component, Type } from '@angular/core';
import { CrudJoiner, MembershipModel } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'membership-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'admin'">
          <i18n>ownership</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'approved'">
          <i18n>approved</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>fullname</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'organisation'">
          <i18n>organisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'username'">
          <i18n>email</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class MembershipTableComponent
  extends BaseTable<MembershipModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.user.label
    },
    {
      name: 'username',
      value: (item) => item.user.username
    },
    {
      name: 'organisation',
      value: (item) => item.organisation.label
    }
  ];

  protected joiner: CrudJoiner;

  protected model: Type<MembershipModel> = MembershipModel;

}
