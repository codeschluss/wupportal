import { Component } from '@angular/core';
import { ActivityModel } from '../../../../core';
import { BaseCard } from '../base.card';

@Component({
  selector: 'activity-card',
  styleUrls: ['../base.card.sass', 'activity.card.sass'],
  templateUrl: 'activity.card.html'
})

export class ActivityCardComponent
  extends BaseCard<ActivityModel> { }
