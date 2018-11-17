import { Component, Input } from '@angular/core';
import { ActivityModel } from '../../../core/models/activity.model';


@Component({
  selector: 'activity-card',
  styleUrls: ['activity.card.component.css', '../main.css'],
  templateUrl: 'activity.card.component.html',
})

export class ActivityCardComponent {

  @Input()
  public activity: ActivityModel;
  constructor() { }

  getDate(): string {
    return this.activity.schedules[0].startDate;
  }

}
