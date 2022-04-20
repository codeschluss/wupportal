import { Component, Type } from '@angular/core';
import { ActivityModel, CrudJoiner } from '../../../core';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { ActivityFormComponent } from '../forms/activity.form';
import { AddressFormComponent } from '../forms/address.form';
import { ImagesFormComponent } from '../forms/images.form';
import { ScheduleFormComponent } from '../forms/schedule.form';
import { TranslationFormComponent } from '../forms/translation.form';

@Component({
  selector: 'activity-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n>createActivity</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n>editActivity</i18n>
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
        <ng-container *ngSwitchCase="'schedules'">
          <i18n>schedules</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'translations'">
          <i18n>translations</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class ActivityStepperComponent
  extends BaseStepper<ActivityModel> {

  public root: string = 'activities';

  public steps: FormStep[] = [
    {
      name: 'main',
      form: ActivityFormComponent
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
    .with('images')
    .with('organisation')
    .with('schedules')
    .with('titleImage')
    .with('targetGroups')
    .with('translations').yield('language');

  protected model: Type<ActivityModel> = ActivityModel;

}
