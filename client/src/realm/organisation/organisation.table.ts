import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { OrganisationModel } from './organisation.model';

@Component({
  selector: 'organisation-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'address'">
          <i18n i18n="@@address">address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <i18n i18n="@@mail">mail</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n i18n="@@phone">phone</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'website'">
          <i18n i18n="@@website">website</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class OrganisationTableComponent extends BaseTable<OrganisationModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.name
    },
    {
      name: 'website',
      value: (item) => item.website
    },
    {
      name: 'mail',
      value: (item) => item.mail
    },
    {
      name: 'phone',
      value: (item) => item.phone
    },
    {
      name: 'address',
      // TODO: non-optional address
      value: (item) => item.address ? item.address.name : ''
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(OrganisationModel)
    .with('address').yield('suburb');

  protected model: Type<OrganisationModel> = OrganisationModel;

}
