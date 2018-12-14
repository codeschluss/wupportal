import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { SuburbModel } from './suburb.model';

@Component({
  selector: 'suburb-table',
  template: BaseTable.template(`
    <ng-container matColumnDef="name">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@title">title</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.name }}</mat-cell>
    </ng-container>
  `)
})

export class SuburbTableComponent extends BaseTable<SuburbModel> {

  public columns = ['name'];

  protected model: Type<SuburbModel> = SuburbModel;

}
