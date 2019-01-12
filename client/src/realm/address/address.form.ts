import { AfterViewInit, Component, ElementRef, Input, Type, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatInput } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Box, CrudJoiner, CrudResolver, LocationProvider, LocationResponse, TokenProvider } from '@portal/core';
import { BaseForm, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
import { SuburbModel } from '../suburb/suburb.model';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-form',
  template: BaseForm.template(`
    <section>
      <label class="mat-body-strong" for="sr">
        <i18n i18n="@@search">search</i18n>
      </label>
      <nav class="output"><mat-form-field>
        <input matInput id="sr" [formControl]="search" [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete"(optionSelected)="set($event)">
          <ng-container *ngFor="let item of options; let i = index">
            <mat-option [value]="i">
              {{ item.street || '?' }}
              {{ item.houseNumber || '?' }},
              {{ item.postalCode || '?' }}
              {{ item.place || '?' }}
              ({{ item.suburb?.name || '?' }})
            </mat-option>
          </ng-container>
        </mat-autocomplete>
      </mat-form-field></nav>
    </section>

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

export class AddressFormComponent extends BaseForm<AddressModel>
  implements AfterViewInit {

  @Input()
  public admin: boolean;

  @ViewChild(MatAutocomplete)
  public auto: MatAutocomplete;

  @ViewChild(MatInput, { read: ElementRef })
  public input: ElementRef<HTMLInputElement>;

  public fields: FormField[] = [
    {
      name: 'suburb',
      input: SelectFieldComponent,
      label: 'name',
      locked: true,
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

  private untouched: AddressModel;

  public get valid(): boolean {
    return Object.values(this.group.getRawValue()).every(Boolean);
  }

  public constructor(
    private crudResolver: CrudResolver,
    private locationProvider: LocationProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider
  ) {
    super(route, tokenProvider);
  }

  public ngAfterViewInit(): void {
    this.group.valueChanges.subscribe(() => this.clear());
    this.input.nativeElement.onblur = () => this.auto.isOpen || this.clear();
    this.search.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap((value) =>  value ? this.suggest(value) : of([]))
    ).subscribe((items) => this.options = items);
  }

  public persist(): Observable<any> {
    this.item.suburbId = this.group.get('suburb').value.id;

    return super.persist();
  }

  public reset(): void {
    this.group.patchValue(this.untouched);
  }

  public set(event: MatAutocompleteSelectedEvent): void {
    this.item = this.options[event.option.value];
    Object.defineProperty(this, 'dirty', { value: true });
    this.group.patchValue({ ...this.item, suburb: this.item.suburb || null });

    this.item.suburb && this.item.suburb.id
      ? this.group.get('suburb').disable()
      : this.group.get('suburb').enable();
  }

  protected ngPostInit(): void {
    this.untouched = Object.assign(new AddressModel(), this.item);
  }

  protected cascade(item: AddressModel): Observable<any> {
    const links = [];
    const provider = this.model['provider'];

    if (this.item.id) {
      const surbId = this.item.suburb && this.item.suburb.id;
      if (surbId !== this.item.suburbId) { links.push(provider
        .relinkSuburb(item.id, Box(this.item.suburbId))); }
    }

    return forkJoin([of(item), ...links]).pipe(map((items) => items.shift()));
  }

  private clear(): void {
    this.input.nativeElement.value = '';
    this.search.setValue('');
  }

  private suggest(label: string = ''): Observable<any> {
    const city = ClientPackage.config.nominatim.city;
    const joiner = CrudJoiner.of(AddressModel).with('suburb');
    const regex = city && new RegExp(city, 'i');
    const search = city ? label.concat(`, ${city}`) : label;

    return this.model['provider'].readAll({
      embeddings: CrudJoiner.to(joiner.graph),
      filter: label
    }).pipe(
      mergeMap((items: any) => this.crudResolver.refine(items, joiner.graph)),
      catchError(() => this.locationProvider.locate(search).pipe(map((items) =>
        items.filter((i) => !regex || i.place && i.place.search(regex) === 0)
      )))
    );
  }

}
