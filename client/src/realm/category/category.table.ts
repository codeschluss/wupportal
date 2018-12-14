import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { CategoryModel } from './category.model';

@Component({
  selector: 'category-table',
  template: BaseTable.template(`
    <ng-container matColumnDef="name">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@title">title</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.name }}</mat-cell>
    </ng-container>
  `)
})

export class CategoryTableComponent extends BaseTable<CategoryModel> {

  public columns = ['name'];

  protected model: Type<CategoryModel> = CategoryModel;

}
