import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { UserModel } from '../../../base/models/user.model';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'user-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@fullname">fullname</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n i18n="@@phone">phone</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'username'">
          <i18n i18n="@@email">email</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class UserTableComponent extends BaseTable<UserModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.name
    },
    {
      name: 'username',
      value: (item) => item.username
    },
    {
      name: 'phone',
      value: (item) => item.phone
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(UserModel)
    .with('blogger');

  protected model: Type<UserModel> = UserModel;

}
