import { Component, Type } from '@angular/core';
import { CrudJoiner, OrganisationModel } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'organisation-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'address'">
          <i18n>address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <i18n>email</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'phone'">
          <i18n>phone</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'website'">
          <i18n>website</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class OrganisationTableComponent
  extends BaseTable<OrganisationModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.label
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
      value: (item) => item.address.label
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(OrganisationModel)
    .with('address').yield('suburb');

  protected model: Type<OrganisationModel> = OrganisationModel;

}
