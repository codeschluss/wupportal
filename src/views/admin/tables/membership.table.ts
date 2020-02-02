import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { MembershipModel } from '../../../base/models/membership.model';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'membership-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'admin'">
          <i18n i18n="@@ownership">ownership</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'approved'">
          <i18n i18n="@@approved">approved</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@fullname">fullname</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'organisation'">
          <i18n i18n="@@organisation">organisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'username'">
          <i18n i18n="@@email">email</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class MembershipTableComponent extends BaseTable<MembershipModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.user.name
    },
    {
      name: 'username',
      value: (item) => item.user.username
    },
    {
      name: 'organisation',
      value: (item) => item.organisation.name
    }
  ];

  protected joiner: CrudJoiner;

  protected model: Type<MembershipModel> = MembershipModel;

}
