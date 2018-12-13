import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudJoiner } from '@portal/core';
import { BaseStepper } from '@portal/forms';
import { AddressFormComponent } from '../address/address.form';
import { ActivityFormComponent } from './activity.form';
import { ActivityModel } from './activity.model';

@Component({
  selector: 'activity-stepper',
  template: BaseStepper.template(`
    <ng-container *ngIf="true; then new"></ng-container>

    <ng-template #name>
      {{ route.snapshot.data[root].name }}
    </ng-template>
    <ng-template #new>
      <i18n i18n="@@newActivity">newActivity</i18n>
    </ng-template>
  `)
})

export class ActivityStepperComponent extends BaseStepper<ActivityModel> {

  public root = 'activity';

  public steps = [
    {
      field: this.root,
      form: ActivityFormComponent
    },
    {
      field: 'address',
      form: AddressFormComponent
    }
  ];

  protected joiner = CrudJoiner.of(ActivityModel)
    .with('address').yield('suburb')
    .with('category')
    .with('organisation')
    .with('schedules')
    .with('tags', { sort: 'name', dir: 'asc' })
    .with('targetGroups');

  protected model = ActivityModel;

  public constructor(
    protected builder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

}
