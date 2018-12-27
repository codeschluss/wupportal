import { Component, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { NominatimProvider } from '@portal/core';
import { BaseForm, FormField, SelectDialogComponent, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SuburbModel } from '../suburb/suburb.model';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <i18n *ngSwitchCase="'houseNumber'"
          i18n="@@houseNumber">houseNumber</i18n>
        <i18n *ngSwitchCase="'latitude'" i18n="@@latitude">latitude</i18n>
        <i18n *ngSwitchCase="'longitude'" i18n="@@longitude">longitude</i18n>
        <i18n *ngSwitchCase="'place'" i18n="@@place">place</i18n>
        <i18n *ngSwitchCase="'postalCode'" i18n="@@postalCode">postalCode</i18n>
        <i18n *ngSwitchCase="'suburb'" i18n="@@suburb">suburb</i18n>
        <i18n *ngSwitchCase="'street'" i18n="@@street">street</i18n>
      </ng-container>
    </ng-template>
  `) + `
    <button mat-button (click)="lookup()">
      <i18n i18n="@@lookup">lookup</i18n>
    </button>
  `
})

export class AddressFormComponent extends BaseForm<AddressModel> {

  public fields: FormField[] = [
    {
      name: 'street',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'houseNumber',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'postalCode',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'place',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'suburb',
      input: SelectFieldComponent,
      model: SuburbModel,
      tests: [Validators.required]
    },
    {
      name: 'longitude',
      input: StringFieldComponent,
      locked: true,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'latitude',
      input: StringFieldComponent,
      locked: true,
      tests: [Validators.required],
      type: 'number'
    }
  ];

  public model: Type<AddressModel> = AddressModel;

  public constructor(
    private dialog: MatDialog,
    private nominatimProvider: NominatimProvider,
    builder: FormBuilder,
    route: ActivatedRoute,
  ) {
    super(route, builder);
  }

  public persist(item: AddressModel = this.item): Observable<any> {
    item.suburbId = this.value('suburb').id;
    return super.persist(item);
  }

  public lookup(): void {
    const label = (item) => `${item.street} ${item.houseNumber},`
      + ` ${item.postalCode} ${item.place}`;

    this.nominatimProvider.search(label(this.group.value))
      .pipe(map((response) => ({ data: { items: response, label: label } })))
      .subscribe((data) => this.dialog.open(SelectDialogComponent, data)
        .afterClosed().pipe(filter(Boolean))
        .subscribe((selection) => this.group.patchValue(selection)));
  }

}
