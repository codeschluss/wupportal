import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-table',
  template: BaseTable.template(`
    <ng-container matColumnDef="street">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@street">street</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.street }}</mat-cell>
    </ng-container>
  `)
})

export class AddressTableComponent extends BaseTable<AddressModel> {

  public columns = ['street'];

  protected model: Type<AddressModel> = AddressModel;

}
