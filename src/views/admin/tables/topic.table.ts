import { Component, Type } from '@angular/core';
import { CrudJoiner, TopicModel } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'topic-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n>description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>title</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class TopicTableComponent
  extends BaseTable<TopicModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.label
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TopicModel);

  protected model: Type<TopicModel> = TopicModel;

}
