import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { CategoryModel } from '../../../base/models/category.model';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'category-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'color'">
          <i18n i18n="@@color">color</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'icon'">
          <i18n i18n="@@icon">icon</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class CategoryTableComponent extends BaseTable<CategoryModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.name
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
