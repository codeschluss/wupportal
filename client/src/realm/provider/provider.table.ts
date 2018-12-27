import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { ProviderModel } from './provider.model';

@Component({
  selector: 'provider-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'admin'" i18n="@@admin">admin</i18n>
        <i18n *ngSwitchCase="'approved'" i18n="@@approved">approved</i18n>
        <i18n *ngSwitchCase="'name'" i18n="@@fullname">fullname</i18n>
        <i18n *ngSwitchCase="'organisation'"
          i18n="@@organisation">organisation</i18n>
        <i18n *ngSwitchCase="'username'" i18n="@@username">username</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class ProviderTableComponent extends BaseTable<ProviderModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      sort: true,
      value: (item) => item.user.name
    },
    {
      name: 'username',
      sort: true,
      value: (item) => item.user.username
    },
    {
      name: 'organisation',
      sort: true,
      value: (item) => item.organisation.name
    }
  ];

  protected joiner: CrudJoiner;

  protected model: Type<ProviderModel> = ProviderModel;

}
