import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { UserModel } from './user.model';

@Component({
  selector: 'user-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'name'" i18n="@@name">name</i18n>
        <i18n *ngSwitchCase="'username'" i18n="@@username">username</i18n>
        <i18n *ngSwitchCase="'phone'" i18n="@@phone">phone</i18n>
        <i18n *ngSwitchCase="'superuser'" i18n="@@superuser">superuser</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class UserTableComponent extends BaseTable<UserModel> {

  public columns = [
    {
      name: 'name',
      sort: true,
      value: (item) => item.name
    },
    {
      name: 'username',
      sort: true,
      value: (item) => item.username
    },
    {
      name: 'phone',
      sort: true,
      value: (item) => item.phone
    },
    {
      name: 'superuser',
      sort: true,
      value: (item) => item.superuser
    },
  ];

  protected model: Type<UserModel> = UserModel;

}
