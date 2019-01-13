import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { BlogModel } from './blog.model';

@Component({
  selector: 'blog-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'activity'">
          <i18n i18n="@@activity">activity</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'author'">
          <i18n i18n="@@author">author</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'title'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class BlogTableComponent extends BaseTable<BlogModel> {

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
      value: (item) => item.activity ? item.activity.name : ''
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(BlogModel)
    .with('activity');

  protected model: Type<BlogModel> = BlogModel;

}
