import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicationSettings } from '@wooportal/app';
import { Box, TokenProvider } from '@wooportal/core';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { AddressModel } from '../../../base/models/address.model';
import { SuburbModel } from '../../../base/models/suburb.model';
import { AddressProvider } from '../../../base/providers/address.provider';
import { TranslationProvider } from '../../../base/providers/translation.provider';
import { BaseForm, FormField } from '../base/base.form';
import { InputFieldComponent } from '../fields/input.field';
import { SelectFieldComponent } from '../fields/select.field';

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
  `, `
    <ng-container *ngIf="superuser | async">
      <section>
        <label class="mat-body-strong">
          <i18n i18n="@@compilation">compilation</i18n>
        </label>
        <nav>
          <button mat-button
            color="primary"
            [disabled]="locked"
            (click)="this.locate()">
            <i18n i18n="@@autoLocate">autoLocate</i18n>
          </button>
        </nav>
      </section>
    </ng-container>
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
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'houseNumber',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'postalCode',
      input: InputFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'place',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'longitude',
      input: InputFieldComponent,
      type: 'number'
    },
    {
      name: 'latitude',
      input: InputFieldComponent,
      type: 'number'
    }
  ];

  public model: Type<AddressModel> = AddressModel;

  public get locked(): boolean {
    return !this.valid ||
      !!(this.group.get('latitude').value && this.group.get('longitude').value);
  }

  public get superuser(): Observable<boolean> {
    return this.tokenProvider.value.pipe(map((t) => t.access.superuser));
  }

  public constructor(
    private addressProvider: AddressProvider,
    private app: ApplicationSettings,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public locate(): void {
    this.addressProvider.lookup(this.group.value).pipe(
      map((response) => this.addressProvider.system.cast(response))
    ).subscribe((item) => this.group.patchValue(item));
  }

  public persist(): Observable<any> {
    this.item.suburbId = this.group.get('suburb').value.id;

    return this.superuser.pipe(take(1), mergeMap((su) => super.persist(!su)));
  }

  protected ngPostInit(): void {
    if (this.app.config.defaults.city) {
      Object.assign(this.fields.find((field) => field.name === 'place'), {
        locked: true,
        value: this.app.config.defaults.city
      });
    }

    this.superuser.pipe(take(1), filter((su) => !su)).subscribe(() => {
      this.fields = this.fields.filter((field) => ![
        'latitude',
        'longitude'
      ].includes(field.name));

      if (this.item.id) {
        Object.assign(this.fields.find((field) => field.name === 'suburb'), {
          locked: true
        });
      }

      this.group.valueChanges.pipe(take(1)).subscribe(() => {
        this.item.id = undefined;
        Object.assign(this.fields.find((field) => field.name === 'suburb'), {
          locked: false
        });
      });
    });
  }

  protected cascade(item: AddressModel): Observable<any> {
    const links = [];

    if (this.item.id) {
      const sId = this.item.suburb && this.item.suburb.id;
      if (sId !== this.item.suburbId) { links.push(this.addressProvider
        .relinkSuburb(item.id, Box(this.item.suburbId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
