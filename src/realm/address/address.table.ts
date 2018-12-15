import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'locale'" i18n="@@locale">locale</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class AddressTableComponent extends BaseTable<AddressModel> {

  public columns = [
    {
      name: 'street',
      sort: true,
      value: (item) => item.street
    },
    {
      name: 'houseNumber',
      sort: true,
      value: (item) => item.houseNumber
    },
    {
      name: 'postalCode',
      sort: true,
      value: (item) => item.postalCode
    },
    {
      name: 'place',
      sort: true,
      value: (item) => item.place
    },
    {
      name: 'suburb',
      value: (item) => item.suburb.name
    },
  ];

  protected model: Type<AddressModel> = AddressModel;

}
