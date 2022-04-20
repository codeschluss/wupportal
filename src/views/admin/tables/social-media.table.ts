import { Component, Type } from '@angular/core';
import { CrudJoiner, SocialMediaModel } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'social-media-table',
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
      value: (item) => `
        <a target="_blank" href="https://fontawesome.com/icons/${item.icon}">
          ${item.icon}
        </a>
      `
    },
    {
      name: 'url',
      value: (item) => item.url
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SocialMediaModel);

  protected model: Type<SocialMediaModel> = SocialMediaModel;

}
