import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { ProviderModel } from './provider.model';

@Component({
  selector: 'provider-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'admin'">
          <i18n i18n="@@admin">admin</i18n>
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
          <i18n i18n="@@username">username</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ProviderTableComponent extends BaseTable<ProviderModel> {

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

  protected model: Type<ProviderModel> = ProviderModel;

}
