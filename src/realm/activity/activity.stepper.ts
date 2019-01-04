import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
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
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createActivity">createActivity</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editActivity">editActivity</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'activity'">
          <i18n i18n="@@activity">activity</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'address'">
          <i18n i18n="@@address">address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'schedules'">
          <i18n i18n="@@schedules">schedules</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'translations'">
          <i18n i18n="@@translations">translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ActivityStepperComponent
  extends BaseStepper<ActivityModel> {

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

}
