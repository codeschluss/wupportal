import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { AddressFormComponent } from '../address/address.form';
import { ImageFormComponent } from '../image/image.form';
import { TranslationFormComponent } from '../translation/translation.form';
import { OrganisationFormComponent } from './organisation.form';
import { OrganisationModel } from './organisation.model';

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

        <ng-container *ngSwitchCase="'address'">
          <i18n i18n="@@address">address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'images'">
          <i18n i18n="@@images">images</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'organisation'">
          <i18n i18n="@@organisation">organisation</i18n>
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

  public root: string = 'organisation';

  public steps: FormStep[] = [
    {
      name: this.root,
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
    .with('images');

  protected model: Type<OrganisationModel> = OrganisationModel;

}
