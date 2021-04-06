import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigurationModel, ConfigurationProvider, TokenProvider, TranslationProvider } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { InputFieldComponent } from '../fields/input.field';

@Component({
  selector: 'configuration-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'mapCluster'">
          <i18n>mapCluster</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapLatitude'">
          <i18n>mapLatitude</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapLongitude'">
          <i18n>mapLongitude</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapProjection'">
          <i18n>mapProjection</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapZoomfactor'">
          <i18n>mapZoomfactor</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'portalMail'">
          <i18n>email</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'portalName'">
          <i18n>title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'portalSubtitle'">
          <i18n>tagline</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ConfigurationFormComponent
  extends BaseForm<ConfigurationModel> {

  public item: any;

  public fields: FormField[] = [
    {
      name: 'portalName',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'portalSubtitle',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'portalMail',
      input: InputFieldComponent,
      tests: [
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.required
      ]
    },
    {
      name: 'mapLongitude',
      input: InputFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'mapLatitude',
      input: InputFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'mapZoomfactor',
      input: InputFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'mapProjection',
      input: InputFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'mapCluster',
      input: InputFieldComponent,
      tests: [Validators.required],
      type: 'number'
    }
  ];

  public model: Type<ConfigurationModel> = ConfigurationModel;

  public constructor(
    private configurationProvider: ConfigurationProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public persist(): Observable<any> {
    return forkJoin(Object.keys(this.group.controls)
      .filter((key) => this.group.get(key).dirty)
      .map((key) => {
        const item = Object.assign(this.config(key), {
          value: this.group.get(key).value
        });

        return item.id
          ? this.configurationProvider.update(item)
          : this.configurationProvider.create(item);
      })
    ).pipe(tap(() => this.group.markAsPristine()));
  }

  protected ngPostInit(): void {
    this.fields.forEach((field, i) =>
      this.fields[i].value = this.config(field.name).value);
  }

  private config(key: string): ConfigurationModel {
    return this.item.find((configuration) => configuration.item === key)
      || Object.assign(new ConfigurationModel(), { item: key });
  }

}
