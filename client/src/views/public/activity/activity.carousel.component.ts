import { Component, Input, AfterViewInit } from '@angular/core';
import { ActivityModel } from '../../../core/models/activity.model';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';

@Component({
  selector: 'activity-carousel-component',
  styleUrls: [
    'activity.carousel.component.scss', '../main.css'
  ],
  templateUrl: 'activity.carousel.component.html'
})

export class ActivityCarouselComponent implements AfterViewInit {

  public static readonly imports =[
    NgxHmCarouselModule
  ];

  @Input()
  public activities: ActivityModel[];

  public clusteredActivities: ActivityModel[][] = [];

  index = 0;
  speed = 5000;
  infinite = false;
  direction = 'right';
  directionToggle = true;
  autoplay = false;

  constructor() { }

  ngAfterViewInit(): void {
    let clusterIndex = 0;
    let index = 0;

    this.activities.forEach(activity => {
      if (!this.clusteredActivities[clusterIndex]) {
        this.clusteredActivities[clusterIndex] = [];
      }
      this.clusteredActivities[clusterIndex].push(activity);
      index++;
      if (index === 4) {
        index = 0;
        clusterIndex++;
      }
    });
  }

}
