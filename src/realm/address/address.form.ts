import { Component, ElementRef, Type, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, LocationProvider, LocationResponse } from '@portal/core';
import { BaseForm, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
import { SuburbModel } from '../suburb/suburb.model';
import { AddressModel } from './address.model';
import { AddressProvider } from './address.provider';

@Component({
  selector: 'address-form',
  template: `
    <mat-form-field>
      <input #input matInput [formControl]="search" [matAutocomplete]="auto">
      <mat-autocomplete #auto="matAutocomplete" (optionSelected)="set($event)">
        <ng-container *ngFor="let item of options; let i = index">
          <mat-option [value]="i">
            {{ item.street || '?' }}
            {{ item.houseNumber || '?' }},
            {{ item.postalCode || '?' }}
            {{ item.place || '?' }}
            ({{ item?.suburb?.name || '?' }})
          </mat-option>
        </ng-container>
      </mat-autocomplete>
    </mat-form-field>
  ` + BaseForm.template(`
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
  `)
})

export class AddressFormComponent extends BaseForm<AddressModel> {

  @ViewChild('auto')
  public auto: MatAutocomplete;

  @ViewChild('input')
  public input: ElementRef<HTMLInputElement>;

  public fields: FormField[] = [
    {
      name: 'suburb',
      input: SelectFieldComponent,
      model: SuburbModel,
      tests: [Validators.required]
    },
    {
      name: 'street',
      input: StringFieldComponent,
      locked: true,
      tests: [Validators.required]
    },
    {
      name: 'houseNumber',
      input: StringFieldComponent,
      locked: true,
      tests: [Validators.required]
    },
    {
      name: 'postalCode',
      input: StringFieldComponent,
      locked: true,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'place',
      input: StringFieldComponent,
      locked: true,
      tests: [Validators.required],
      value: ClientPackage.config.nominatim.city
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

  public options: AddressModel[] & LocationResponse[];

  public search: FormControl = new FormControl();

  public constructor(
    private addressProvider: AddressProvider,
    private crudResolver: CrudResolver,
    private locationProvider: LocationProvider,
    route: ActivatedRoute,
  ) {
    super(route);
  }

  public set(event: MatAutocompleteSelectedEvent): void {
    const item = this.options[event.option.value];
    this.group.patchValue({ ...item, suburb: item.suburb || null });
  }

  protected ngPostInit(): void {
    this.group.valueChanges.subscribe(() => this.clear());
    this.input.nativeElement.onblur = () => this.auto.isOpen || this.clear();
    this.search.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap((label) =>  label ? this.optionalize(label) : of([]))
    ).subscribe((items) => this.options = items);
  }

  protected persist(items?: { [key: string]: CrudModel }): Observable<any> {
    this.item.suburbId = this.value('suburb', items).id;
    return super.persist(items);
  }

  private clear(): void {
    this.input.nativeElement.value = '';
    this.search.setValue('');
  }

  private optionalize(label: string = ''): Observable<any> {
    const city = ClientPackage.config.nominatim.city;
    const joiner = CrudJoiner.of(AddressModel).with('suburb');
    const regex = city && new RegExp(city, 'i');

    return this.addressProvider.readAll({
      embeddings: CrudJoiner.to(joiner.graph),
      filter: label
    }).pipe(
      mergeMap((items) => this.crudResolver.refine(items, joiner.graph)),
      catchError(() => this.locationProvider.locate(label).pipe(map((items) =>
        items.filter((i) => !regex || i.place && i.place.search(regex) >= 0)
      )))
    );
  }

}
