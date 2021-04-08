import { Component, Type } from '@angular/core';
import { AddressModel, CrudJoiner } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'address-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'houseNumber'">
          <i18n>houseNumber</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'place'">
          <i18n>place</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'postalCode'">
          <i18n>postalCode</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'street'">
          <i18n>street</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'suburb'">
          <i18n>suburb</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class AddressTableComponent
  extends BaseTable<AddressModel> {

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
      value: (item) => item.suburb.label
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(AddressModel)
    .with('suburb');

  protected model: Type<AddressModel> = AddressModel;

}
