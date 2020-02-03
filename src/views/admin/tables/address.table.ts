import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { AddressModel } from '../../../base/models/address.model';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'address-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'houseNumber'">
          <i18n i18n="@@houseNumber">houseNumber</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'place'">
          <i18n i18n="@@place">place</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'postalCode'">
          <i18n i18n="@@postalCode">postalCode</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'street'">
          <i18n i18n="@@street">street</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'suburb'">
          <i18n i18n="@@suburb">suburb</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class AddressTableComponent extends BaseTable<AddressModel> {

  public columns: TableColumn[] = [
    {
      name: 'street',
      value: (item) => item.street
    },
    {
      name: 'houseNumber',
      value: (item) => item.houseNumber
    },
    {
      name: 'postalCode',
      value: (item) => item.postalCode
    },
    {
      name: 'place',
      value: (item) => item.place
    },
    {
      name: 'suburb',
      value: (item) => item.suburb.name
    },
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(AddressModel)
    .with('suburb');

  protected model: Type<AddressModel> = AddressModel;

}
