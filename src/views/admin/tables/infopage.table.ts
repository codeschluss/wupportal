import { Component, Type } from '@angular/core';
import { CrudJoiner, InfopageModel } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'infopage-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'title'">
          <i18n>title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'topic'">
          <i18n>topic</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class InfopageTableComponent
  extends BaseTable<InfopageModel> {

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

  protected joiner: CrudJoiner = CrudJoiner.of(InfopageModel)
    .with('topic');

  protected model: Type<InfopageModel> = InfopageModel;

}
