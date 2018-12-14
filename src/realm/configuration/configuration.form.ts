import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm, StringFieldComponent } from '@portal/forms';
import { ConfigurationModel } from './configuration.model';
import { ConfigurationProvider } from './configuration.provider';

@Component({
  selector: 'configuration-form',
  template: BaseForm.template(`
    <i18n *ngSwitchCase="'mapcenterLatitude'"
      i18n="@@mapcenterLatitude">mapcenterLatitude</i18n>
    <i18n *ngSwitchCase="'mapcenterLongitude'"
      i18n="@@mapcenterLongitude">mapcenterLongitude</i18n>
    <i18n *ngSwitchCase="'mapProjection'"
      i18n="@@mapProjection">mapProjection</i18n>
    <i18n *ngSwitchCase="'portalMail'" i18n="@@portalMail">portalMail</i18n>
    <i18n *ngSwitchCase="'portalName'" i18n="@@portalName">portalName</i18n>
    <i18n *ngSwitchCase="'portalSubtitle'"
      i18n="@@portalSubtitle">portalSubtitle</i18n>
    <i18n *ngSwitchCase="'zoomfactor'" i18n="@@zoomfactor">zoomfactor</i18n>
  `)
})

export class ConfigurationFormComponent extends BaseForm<ConfigurationModel> {

  public fields = [
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
      name: 'mapProjection',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'mapcenterLongitude',
      input: StringFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'mapcenterLatitude',
      input: StringFieldComponent,
      tests: [Validators.required],
      type: 'number'
    },
    {
      name: 'zoomfactor',
      input: StringFieldComponent,
      tests: [Validators.required],
      type: 'number'
    }
  ];

  public model = ConfigurationModel;

  public constructor(
    protected builder: FormBuilder,
    protected provider: ConfigurationProvider,
    protected route: ActivatedRoute
  ) {
    super();
  }

}
