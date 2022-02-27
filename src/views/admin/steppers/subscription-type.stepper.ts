import { Component, Type } from '@angular/core';
import { CrudJoiner, SubscriptionTypeModel } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { SubscriptionTypeFormComponent } from '../forms/subscription-type.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'subscription-type-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editSubscriptionType</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'main'">
          <i18n>main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'translations'">
          <i18n>translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SubscriptionTypeStepperComponent
  extends BaseStepper<SubscriptionTypeModel> {

  public root: string = 'subscriptiontypes';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: SubscriptionTypeFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SubscriptionTypeModel)
    .with('translations').yield('language');

  protected model: Type<SubscriptionTypeModel> = SubscriptionTypeModel;

  protected get path(): string {
    return 'subscription-types';
  }

}
