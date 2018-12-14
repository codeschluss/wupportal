import { Component, Type } from '@angular/core';
import { BaseTable } from '@portal/forms';
import { OrganisationModel } from './organisation.model';

@Component({
  selector: 'organisation-table',
  template: BaseTable.template(`
    <ng-container matColumnDef="name">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@title">title</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.name }}</mat-cell>
    </ng-container>

    <ng-container matColumnDef="website">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@website">website</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.website }}</mat-cell>
    </ng-container>

    <ng-container matColumnDef="mail">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@mail">mail</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.mail }}</mat-cell>
    </ng-container>

    <ng-container matColumnDef="phone">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@phone">phone</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">{{ row.phone }}</mat-cell>
    </ng-container>

    <ng-container matColumnDef="address">
      <mat-header-cell mat-sort-header *matHeaderCellDef>
        <i18n i18n="@@address">address</i18n></mat-header-cell>
      <mat-cell *matCellDef="let row">
        {{ row.address.street }} {{ row.address.houseNumber }}
        {{ row.address.postalCode }} {{ row.address.place }}
        {{ row.address.suburb.name }}
      </mat-cell>
    </ng-container>
  `)
})

export class OrganisationTableComponent extends BaseTable<OrganisationModel> {

  public columns = ['name', 'website', 'mail', 'phone', 'address'];

  protected model: Type<OrganisationModel> = OrganisationModel;

}
