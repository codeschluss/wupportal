import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseTable, TableColumn } from '@portal/forms';
import { TagModel } from './tag.model';

@Component({
  selector: 'tag-table',
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

export class TagTableComponent extends BaseTable<TagModel> {

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

  protected joiner: CrudJoiner = CrudJoiner.of(TagModel);

  protected model: Type<TagModel> = TagModel;

}
