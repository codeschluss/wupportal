import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Box, CrudJoiner, CrudResolver, TokenProvider } from '@portal/core';
import { BaseForm, FormField, SelectFieldComponent, StringFieldComponent } from '@portal/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
import { SuburbModel } from '../suburb/suburb.model';
import { AddressModel } from './address.model';

@Component({
  selector: 'address-form',
  template: BaseForm.template(`
    <section>
      <label class="mat-body-strong" for="sr">
        <i18n i18n="@@compilation">compilation</i18n>
      </label>
      <nav>
        <ng-container *ngIf="this.group.disabled">
          <button mat-button color="primary" (click)="this.edit()">
            <i18n i18n="@@edit">edit</i18n>
          </button>
        </ng-container>
        <ng-container *ngIf="!this.group.disabled">
          <button mat-button color="primary" [disabled]="!this.group.valid"
            (click)="this.address()">
            <i18n i18n="@@autoLocate">autoLocate</i18n>
          </button>
        </ng-container>
      </nav>
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

export class AddressFormComponent
  extends BaseForm<AddressModel> {

  public fields: FormField[] = [
    {
      name: 'suburb',
      input: SelectFieldComponent,
      label: 'name',
      model: SuburbModel,
      tests: [Validators.required]
    },
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
      tests: [Validators.required],
      locked: !!ClientPackage.config.nominatim.city,
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

  public get valid(): boolean {
    return Object.values(this.group.getRawValue()).every(Boolean);
  }

  public constructor(
    private crudResolver: CrudResolver,
    route: ActivatedRoute,
    tokenProvider: TokenProvider
  ) {
    super(route, tokenProvider);
  }

  public address(): void {
    const addr = Object.assign(new AddressModel(), this.item);
    const joiner = CrudJoiner.of(AddressModel).with('suburb');

    this.item.id = null;
    this.item.suburbId = this.group.get('suburb').value.id;

    super.persist().pipe(
      catchError(() => of(addr)),
      mergeMap((item) => this.crudResolver.refine(item as any, joiner.graph)),
    ).subscribe((item) => {
      this.group.disable();
      this.group.patchValue(this.item = item as any);
    });
  }

  public edit(): void {
    this.group.get('latitude').patchValue(null);
    this.group.get('longitude').patchValue(null);

    new (this.constructor as any)().fields.filter((field) => !field.locked)
      .forEach((field) => this.group.get(field.name).enable());
  }

  public persist(): Observable<any> {
    return of(this.item);
  }

  public reset(): void {
    const item = this.route.parent.snapshot.data.item;

    if (item && item.address) {
      this.group.disable();
      this.group.reset(item.address);
    } else {
      this.edit();
      this.group.get('suburb').patchValue(null);
      this.group.reset(this.fields.reduce((obj, field) =>
        Object.assign(obj, { [field.name]: field.value })));
    }
  }

  protected ngPostInit(): void {
    if (this.item.id) {
      this.fields.forEach((field, i) => this.fields[i].locked = true);
    }
  }

  protected cascade(item: AddressModel): Observable<any> {
    const links = [];
    const provider = this.model['provider'];

    if (this.item.id) {
      const surbId = this.item.suburb && this.item.suburb.id;
      if (surbId !== this.item.suburbId) { links.push(provider
        .relinkSuburb(item.id, Box(this.item.suburbId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
