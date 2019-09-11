import { Component, Optional, Type } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { CrudJoiner, PlatformProvider, Title } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { ScheduleModel } from '../../../../realm/models/schedule.model';
import { ClientPackage } from '../../../../utils/package';
import { BaseObject } from '../base.object';

@Component({
  styleUrls: ['../base.object.scss', 'activity.object.scss'],
  templateUrl: 'activity.object.html'
})

export class ActivityObjectComponent extends BaseObject<ActivityModel> {

  public dateFilter: (date: Date) => boolean = this.selectable.bind(this);

  public selection: ScheduleModel;

  public source: SafeResourceUrl | string;

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

  public get startDate(): Date {
    return new Date(this.item.schedules[0].startDate);
  }

  public constructor(
    @Optional() private sanitizer: DomSanitizer,
    i18n: I18n,
    platformProvider: PlatformProvider,
    route: ActivatedRoute,
    router: Router,
    titleService: Title
  ) {
    super(router, platformProvider, i18n, route, titleService);
  }

  public click(event: Event): void {
    const cell = (event.target as HTMLElement).parentElement;

    if (cell.classList.contains('mat-calendar-body-disabled')) {
      this.selection = null;
    }
  }

  public selected(date: Date): void {
    this.selection = this.schedule(date);
  }

  protected ngPostInit(): void {
    const url = `/mapview?embed&items=${this.item.id}`;

    switch (this.platformProvider.type) {
      case 'Native':
        this.source = ClientPackage.config.defaults.appUrl + url + '&native';
        break;

      case 'Online':
        this.source = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        break;
    }
  }

  private selectable(date: Date): boolean {
    return this.schedule(date) ? true : false;
  }

  private schedule(date: Date): ScheduleModel {
    return this.item.schedules.find((schedule) =>
      !(+new Date(schedule.startDate).setHours(0, 0, 0, 0) - +date));
  }

}
