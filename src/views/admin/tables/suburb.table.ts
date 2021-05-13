import { Component, Type } from '@angular/core';
import { CrudJoiner, SuburbModel } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'suburb-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SuburbTableComponent
  extends BaseTable<SuburbModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.label
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SuburbModel);

  protected model: Type<SuburbModel> = SuburbModel;

}
