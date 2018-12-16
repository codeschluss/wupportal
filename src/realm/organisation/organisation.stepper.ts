import { Component, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
        <i18n *ngSwitchCase="'activity'" i18n="@@activity">activity</i18n>
        <i18n *ngSwitchCase="'address'" i18n="@@address">address</i18n>
        <i18n *ngSwitchCase="'schedules'" i18n="@@schedules">schedules</i18n>
        <i18n *ngSwitchCase="'translations'"
          i18n="@@translations">translations</i18n>
      </ng-container>
    </ng-template>
  `)
})

export class OrganisationStepperComponent
  extends BaseStepper<OrganisationModel> {

  public root: string = 'activity';

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
    .with('category')
    .with('organisation')
    .with('schedules')
    .with('tags')
    .with('targetGroups');

  protected model: Type<OrganisationModel> = OrganisationModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

}
