import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { CategoryModel } from './category.model';

@Component({
  selector: 'category-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'color'" i18n="@@color">color</i18n>
        <i18n *ngSwitchCase="'name'" i18n="@@title">title</i18n>
        <i18n *ngSwitchCase="'description'"
          i18n="@@description">description</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class CategoryTableComponent extends BaseTable<CategoryModel> {

  public columns = [
    {
      name: 'name',
      sort: true,
      value: (item) => item.name
    },
    {
      name: 'description',
      sort: true,
      value: (item) => item.description
    },
    {
      name: 'color',
      sort: true,
      value: (item) => item.color
    }
  ];

  protected model: Type<CategoryModel> = CategoryModel;

}
