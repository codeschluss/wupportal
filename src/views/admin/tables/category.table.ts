import { Component, Type } from '@angular/core';
import { CategoryModel, CrudJoiner } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'category-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'color'">
          <i18n>color</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'description'">
          <i18n>description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'icon'">
          <i18n>icon</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class CategoryTableComponent
  extends BaseTable<CategoryModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.label
    },
    {
      name: 'description',
      value: (item) => item.description
    },
    {
      name: 'icon',
      value: (item) => `
        <a target="_blank" href="https://fontawesome.com/icons/${item.icon}">
          ${item.icon}
        </a>
      `
    },
    {
      name: 'color',
      value: (item) => `
        <strong><font color="${item.color}">${item.color}</font></strong>
      `
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(CategoryModel);

  protected model: Type<CategoryModel> = CategoryModel;

}
