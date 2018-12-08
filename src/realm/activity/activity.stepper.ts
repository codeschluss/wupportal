import { Component } from '@angular/core';
import { BaseStepper } from '@portal/mgmt';
import { AddressFormComponent } from '../address/address.form';
import { ActivityFormComponent } from './activity.form';
import { ActivityModel } from './activity.model';
import { ActivityProvider } from './activity.provider';

@Component({
  selector: 'activity-stepper',
  template: BaseStepper.template(`
    <ng-container *ngIf=""></ng-container>

    <ng-template #name>
      {{ route.snapshot.data[base].name }}
    </ng-template>
    <ng-template #new>
      <i18n i18n="@@newActivity">newActivity</i18n>
    </ng-template>
  `)
})

export class ActivityStepperComponent
  extends BaseStepper<ActivityProvider, ActivityModel> {

  protected base = 'activity';

  protected steps = [
    {
      form: ActivityFormComponent
    },
    {
      form: AddressFormComponent
    }
  ];

  protected model = ActivityModel;

  protected provider = ActivityProvider;

}
