import { Component, Type } from '@angular/core';
import { CrudJoiner, TargetGroupModel } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'target-group-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n>description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class TargetGroupTableComponent
  extends BaseTable<TargetGroupModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.label
    },
    {
      name: 'description',
      value: (item) => item.description
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TargetGroupModel);

  protected model: Type<TargetGroupModel> = TargetGroupModel;

}
