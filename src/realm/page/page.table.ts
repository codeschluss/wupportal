import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { PageModel } from './page.model';

@Component({
  selector: 'page-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'title'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'topic'">
          <i18n i18n="@@topic">topic</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class PageTableComponent extends BaseTable<PageModel> {

  public columns: TableColumn[] = [
    {
      name: 'title',
      value: (item) => item.title
    },
    {
      name: 'topic',
      value: (item) => item.topic.name
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(PageModel)
    .with('topic');

  protected model: Type<PageModel> = PageModel;

}
