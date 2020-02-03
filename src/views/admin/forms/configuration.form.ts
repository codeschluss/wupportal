import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TokenProvider } from '@wooportal/core';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigurationModel } from '../../../base/models/configuration.model';
import { ConfigurationProvider } from '../../../base/providers/configuration.provider';
import { TranslationProvider } from '../../../base/providers/translation.provider';
import { BaseForm, FormField } from '../base/base.form';
import { StringFieldComponent } from '../fields/string.field';

@Component({
  selector: 'configuration-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'mapCluster'">
          <i18n i18n="@@mapCluster">mapCluster</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapLatitude'">
          <i18n i18n="@@mapLatitude">mapLatitude</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapLongitude'">
          <i18n i18n="@@mapLongitude">mapLongitude</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapProjection'">
          <i18n i18n="@@mapProjection">mapProjection</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapZoomfactor'">
          <i18n i18n="@@mapZoomfactor">mapZoomfactor</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'portalMail'">
          <i18n i18n="@@email">email</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'portalName'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'portalSubtitle'">
          <i18n i18n="@@tagline">tagline</i18n>
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
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'portalSubtitle',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'portalMail',
      input: StringFieldComponent,
      tests: [
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.required
      ]
    },
    {
      name: 'mapLongitude',
      input: StringFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'mapLatitude',
      input: StringFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'mapZoomfactor',
      input: StringFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'mapProjection',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'mapCluster',
      input: StringFieldComponent,
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
