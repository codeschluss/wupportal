import { Component, Type } from '@angular/core';
import { SocialMediaModel } from 'src/core/models/socialmedia.model';
import { CrudJoiner } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'socialmedia-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'name'">
          <i18n>name</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'icon'">
          <i18n>icon</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'url'">
          <i18n>url</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SocialMediaTableComponent
  extends BaseTable<SocialMediaModel> {

  public columns: TableColumn[] = [
    {
      name: 'name',
      value: (item) => item.label
    },
    {
      name: 'icon',
      value: (item) => item.icon
    },
    {
      name: 'url',
      value: (item) => item.url
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SocialMediaModel);

  protected model: Type<SocialMediaModel> = SocialMediaModel;

}
