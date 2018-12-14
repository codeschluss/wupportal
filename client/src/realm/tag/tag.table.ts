import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { TagModel } from './tag.model';

@Component({
  selector: 'tag-table',
  template: BaseTable.template(`
    <ng-container matColumnDef="name">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@title">title</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.name }}</mat-cell>
    </ng-container>
  `)
})

export class TagTableComponent extends BaseTable<TagModel> {

  public columns = ['name'];

  protected model: Type<TagModel> = TagModel;

}
