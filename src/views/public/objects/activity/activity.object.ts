import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.scss', 'activity.object.scss'],
  templateUrl: 'activity.object.html'
})

export class ActivityObjectComponent extends BaseObject<ActivityModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel)
    .with('address').yield('suburb')
    .with('blogs')
    .with('category')
    .with('organisation').yield('address').yield('suburb')
    .with('organisation').yield('images')
    .with('provider')
    .with('schedules')
    .with('tags')
    .with('targetGroups');

    protected model: Type<ActivityModel> = ActivityModel;

    protected path: string = 'activities';

}
