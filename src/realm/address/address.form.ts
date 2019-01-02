import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocationProvider } from '@portal/core';
import { BaseForm, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { Observable } from 'rxjs';
import { ClientPackage } from '../../utils/package';
import { SuburbModel } from '../suburb/suburb.model';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'houseNumber'">
          <i18n i18n="@@houseNumber">houseNumber</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'latitude'">
          <i18n i18n="@@latitude">latitude</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'longitude'">
          <i18n i18n="@@longitude">longitude</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'place'">
          <i18n i18n="@@place">place</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'postalCode'">
          <i18n i18n="@@postalCode">postalCode</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'street'">
          <i18n i18n="@@street">street</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'suburb'">
          <i18n i18n="@@suburb">suburb</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `) + `
    <button mat-button [disabled]="!enabled" (click)="lookup()">
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
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'place',
      input: StringFieldComponent,
      locked: !!ClientPackage.config.nominatim.city,
      tests: [Validators.required],
      value: ClientPackage.config.nominatim.city
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

  public get enabled(): boolean {
    const value = this.group.getRawValue();
    return value.street
      && value.houseNumber
      && (value.postalCode || value.place);
  }

  public constructor(
    private locationProvider: LocationProvider,
    route: ActivatedRoute,
  ) {
    super(route);
  }

  public lookup(): void {
    const value = this.group.getRawValue();
    this.locationProvider.lookup(
      `${value.street} ${value.houseNumber}, ${value.postalCode} ${value.place}`
    ).subscribe((place) => this.group.patchValue(place));
  }

  protected persist(item: AddressModel = this.item): Observable<any> {
    item.suburbId = this.value('suburb', item).id;
    return super.persist(item);
  }

}
