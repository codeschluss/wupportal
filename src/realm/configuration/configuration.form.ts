import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigurationModel } from './configuration.model';

@Component({
  selector: 'configuration-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'mapCenterLatitude'">
          <i18n i18n="@@mapCenterLatitude">mapCenterLatitude</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapCenterLongitude'">
          <i18n i18n="@@mapCenterLongitude">mapCenterLongitude</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapProjection'">
          <i18n i18n="@@mapProjection">mapProjection</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'mapZoomfactor'">
          <i18n i18n="@@mapZoomfactor">mapZoomfactor</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'portalMail'">
          <i18n i18n="@@portalMail">portalMail</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'portalName'">
          <i18n i18n="@@portalName">portalName</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'portalSubtitle'">
          <i18n i18n="@@portalSubtitle">portalSubtitle</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ConfigurationFormComponent extends BaseForm<ConfigurationModel> {

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
      name: 'mapCenterLongitude',
      input: StringFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'mapCenterLatitude',
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
    }
  ];

  public model: Type<ConfigurationModel> = ConfigurationModel;

  public persist(): Observable<any> {
    return forkJoin(Object.keys(this.group.controls)
      .filter((key) => this.group.get(key).dirty)
      .map((key) => {
        const item = Object.assign(this.config(key), {
          value: this.group.get(key).value
        });

        return item.id
          ? this.model['provider'].update(item, item.id)
          : this.model['provider'].create(item);
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
