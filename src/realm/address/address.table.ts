import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'houseNumber'"
          i18n="@@houseNumber">houseNumber</i18n>
        <i18n *ngSwitchCase="'place'" i18n="@@place">place</i18n>
        <i18n *ngSwitchCase="'postalCode'" i18n="@@postalCode">postalCode</i18n>
        <i18n *ngSwitchCase="'street'" i18n="@@street">street</i18n>
        <i18n *ngSwitchCase="'suburb'" i18n="@@suburb">suburb</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class AddressTableComponent extends BaseTable<AddressModel> {

  public columns: TableColumn[] = [
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

  protected joiner: CrudJoiner = CrudJoiner.of(AddressModel).with('suburb');

  protected model: Type<AddressModel> = AddressModel;

}
