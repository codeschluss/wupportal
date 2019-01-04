import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm, FormField, StringFieldComponent } from '@portal/forms';
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
      tests: [Validators.required, Validators.email]
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

}
