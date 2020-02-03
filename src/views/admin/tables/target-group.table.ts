import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { TargetGroupModel } from '../../../base/models/target-group.model';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'target-group-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'description'">
          <i18n i18n="@@description">description</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'name'">
          <i18n i18n="@@name">name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class TargetGroupTableComponent extends BaseTable<TargetGroupModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.name
    },
    {
      name: 'description',
      value: (item) => item.description
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(TargetGroupModel);

  protected model: Type<TargetGroupModel> = TargetGroupModel;

}
