import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { TargetGroupModel } from './target-group.model';

@Component({
  selector: 'target-group-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'name'" i18n="@@title">title</i18n>
        <i18n *ngSwitchCase="'description'"
          i18n="@@description">description</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class TargetGroupTableComponent extends BaseTable<TargetGroupModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      sort: true,
      value: (item) => item.name
    },
    {
      name: 'description',
      sort: true,
      value: (item) => item.description
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TargetGroupModel);

  protected model: Type<TargetGroupModel> = TargetGroupModel;

}
