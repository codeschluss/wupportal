import { Component, Type } from '@angular/core';
import { CrudJoiner, CrudModel } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { AddressFormComponent } from '../address/address.form';
import { ScheduleFormComponent } from '../schedule/schedule.form';
import { TranslationFormComponent } from '../translation/translation.form';
import { ActivityFormComponent } from './activity.form';
import { ActivityModel } from './activity.model';

@Component({
  selector: 'activity-stepper',
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

export class ActivityStepperComponent extends BaseStepper<ActivityModel> {

  public root: string = 'activity';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: ActivityFormComponent
    },
    {
      name: 'address',
      form: AddressFormComponent
    },
    {
      name: 'schedules',
      form: ScheduleFormComponent
    },
    {
      name: 'translations',
      form: TranslationFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel)
    .with('address').yield('suburb')
    .with('category')
    .with('organisation')
    .with('schedules')
    .with('tags')
    .with('targetGroups');

  protected model: Type<ActivityModel> = ActivityModel;

  protected prepare(items: { [key: string]: CrudModel }): ActivityModel {
    return Object.defineProperties(this.item, {
      address: { value: items.address },
      addressId: { value: items.address.id }
    });
  }

}
