import { Component, Type } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CrudJoiner, Title } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.scss', 'activity.object.scss'],
  templateUrl: 'activity.object.html'
})

export class ActivityObjectComponent extends BaseObject<ActivityModel> {

  public source: SafeResourceUrl;

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

  public constructor(
    private sanitizer: DomSanitizer,
    route: ActivatedRoute,
    titleService: Title
  ) {
    super(route, titleService);
  }

  protected ngPostInit(): void {
    const url = `/mapview?embed=true&items=${this.item.id}`;
    this.source = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
