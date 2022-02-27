import { Component, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudJoiner, CrudResolver, LabelResolver, StaticPageModel } from '../../../core';
import { BaseTable, TableColumn } from '../base/base.table';

@Component({
  selector: 'static-page-table',
  template: BaseTable.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'tagId'">
          <i18n>tagId</i18n>
        </ng-container>
      </ng-container>
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'title'">
          <i18n>title</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class StaticPageTableComponent
  extends BaseTable<StaticPageModel> {

  public columns: TableColumn[] = [
    {
      name: 'tagId',
      value: (item) => item.tagId
    },
    {
      name: 'title',
      value: (item) => item.title
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(StaticPageModel);

  protected model: Type<StaticPageModel> = StaticPageModel;

  public constructor(
    private labelResolver: LabelResolver,
    crudResolver: CrudResolver,
    route: ActivatedRoute,
    router: Router
  ) {
    super(crudResolver, route, router);
  }

  public i18n(text: string): string {
    return this.labelResolver.lookup(text);
  }

}
