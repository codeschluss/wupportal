import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { TopicModel } from '../../../base/models/topic.model';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'topic-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class TopicTableComponent extends BaseTable<TopicModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.name
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TopicModel);

  protected model: Type<TopicModel> = TopicModel;

}
