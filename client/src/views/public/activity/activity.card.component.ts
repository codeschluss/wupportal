import { Component, Input } from '@angular/core';
import { ActivityModel } from '../../../core/models/activity.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'activity-card',
  styleUrls: ['activity.card.component.css'],
  templateUrl: 'activity.card.component.html',
})

export class ActivityCardComponent {

  @Input()
  public activity: ActivityModel;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  getDate(): string {
    return this.activity.schedules[0].startDate;
  }

  openActivityView(): void {
    console.log('openActivityView()');
    this.router.navigate(['/public/activities/view/', this.activity.id]);
  }

}
