import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { OrganisationModel } from '../../../base/models/organisation.model';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { AddressFormComponent } from '../forms/address.form';
import { ImageFormComponent } from '../forms/image.form';
import { OrganisationFormComponent } from '../forms/organisation.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'organisation-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createOrganisation">createOrganisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editOrganisation">editOrganisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'address'">
          <i18n i18n="@@address">address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'images'">
          <i18n i18n="@@images">images</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'translations'">
          <i18n i18n="@@translations">translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class OrganisationStepperComponent
  extends BaseStepper<OrganisationModel> {

  public root: string = 'organisations';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: OrganisationFormComponent
    },
    {
      name: 'address',
      form: AddressFormComponent
    },
    {
      name: 'images',
      form: ImageFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(OrganisationModel)
    .with('address').yield('suburb')
    .with('images')
    .with('translations').yield('language');

  protected model: Type<OrganisationModel> = OrganisationModel;

}
