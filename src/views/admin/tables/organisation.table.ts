import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { OrganisationModel } from '../../../base/models/organisation.model';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'organisation-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'address'">
          <i18n i18n="@@address">address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <i18n i18n="@@email">email</i18n>
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
      value: (item) => item.website ? `
        <a target="_blank" href="${item.website}" title="Website">
          ${item.website.split('://').pop()}
        </a>
      ` : ''
    },
    {
      name: 'mail',
      value: (item) => item.mail ? `
        <a target="_blank" href="mailto:${item.mail}" title="E-Mail">
          ${item.mail}
        </a>
      ` : ''
    },
    {
      name: 'phone',
      value: (item) => item.phone
    },
    {
      name: 'address',
      value: (item) => item.address.name
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(OrganisationModel)
    .with('address').yield('suburb');

  protected model: Type<OrganisationModel> = OrganisationModel;

}
