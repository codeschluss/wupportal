import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { ActivityModel } from '../../../base/models/activity.model';
import { BaseStepper, FormStep } from '../base/base.stepper';
import { ActivityFormComponent } from '../forms/activity.form';
import { AddressFormComponent } from '../forms/address.form';
import { ImageFormComponent } from '../forms/image.form';
import { ScheduleFormComponent } from '../forms/schedule.form';
import { TranslationFormComponent } from '../forms/translation.form';

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
        <ng-container *ngSwitchCase="'main'">
          <i18n i18n="@@main">main</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'address'">
          <i18n i18n="@@address">address</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'images'">
          <i18n i18n="@@images">images</i18n>
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
      form: ImageFormComponent
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
    .with('tags')
    .with('targetGroups')
    .with('translations').yield('language');

  protected model: Type<ActivityModel> = ActivityModel;

}
