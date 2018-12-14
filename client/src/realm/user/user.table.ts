import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { UserModel } from './user.model';

@Component({
  selector: 'user-table',
  template: BaseTable.template(`
    <ng-container matColumnDef="username">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@username">username</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.username }}</mat-cell>
    </ng-container>
  `)
})

export class UserTableComponent extends BaseTable<UserModel> {

  public columns = ['username'];

  protected model: Type<UserModel> = UserModel;

}
