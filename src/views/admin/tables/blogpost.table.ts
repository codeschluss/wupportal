import { Component, Type } from '@angular/core';
import { BlogpostModel, CrudJoiner } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'blogpost-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'activity'">
          <i18n>activity</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'author'">
          <i18n>author</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'title'">
          <i18n>title</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class BlogpostTableComponent
  extends BaseTable<BlogpostModel> {

  public columns: TableColumn[] = [
    {
      name: 'title',
      value: (item) => item.title
    },
    {
      name: 'author',
      value: (item) => item.author
    },
    {
      name: 'activity',
      value: (item) => item.activity ? item.activity.label : ''
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(BlogpostModel)
    .with('activity');

  protected model: Type<BlogpostModel> = BlogpostModel;

}
