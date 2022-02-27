import { Component, Type } from '@angular/core';
import { CrudJoiner, OrganisationModel } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { AddressFormComponent } from '../forms/address.form';
import { ImagesFormComponent } from '../forms/images.form';
import { OrganisationFormComponent } from '../forms/organisation.form';
import { TranslationFormComponent } from '../forms/translation.form';
import { VideoFormComponent } from '../forms/video.form';

@Component({
  selector: 'organisation-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n>createOrganisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editOrganisation</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n>main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'address'">
          <i18n>address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'images'">
          <i18n>images</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'videos'">
          <i18n>videos</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'translations'">
          <i18n>translations</i18n>
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
      form: ImagesFormComponent
    },
    {
      name: 'videos',
      form: VideoFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(OrganisationModel)
    .with('address').yield('suburb')
    .with('avatar')
    .with('images')
    .with('translations').yield('language')
    .with('videos').yield('thumbnail');

  protected model: Type<OrganisationModel> = OrganisationModel;

}
