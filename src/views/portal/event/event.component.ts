import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ActivityModel, CoreSettings, CrudJoiner, CrudResolver, MetatagService, PlatformProvider, RoutingComponent, ScheduleModel, SessionProvider } from '../../../core';

@Component({
  styleUrls: ['event.component.sass'],
  templateUrl: 'event.component.html'
})

export class EventComponent
  extends RoutingComponent
  implements OnInit {

  public dateFilter: (date: Date) => boolean = ((date: Date) => {
    return this.match(date) ? true : false;
  }).bind(this);

  public get root(): string {
    return  `${this.coreSettings.api.rootUrl}/activities/${this.item.id}`;
  }

  public get startAt(): Date {
    return this.item.scheduled?.start || new Date();
  }

  public get item(): ActivityModel {
    return this.route.snapshot.data.item
  }

  protected get routing(): Route {
    return {
      path: 'event/:uuid',
      resolve: {
        item: CrudResolver
      },
      data: {
        resolve: {
          item: CrudJoiner.of(ActivityModel)
            .with('address')
            .with('category')
            .with('images')
            .with('organisation').yield('address')
            .with('organisation').yield('avatar')
            .with('schedules')
            .with('titleImage')
        }
      }
    };
  }

  public constructor(
    private coreSettings: CoreSettings,
    private dateAdapter: DateAdapter<Date>,
    private metatagService: MetatagService,
    private platformProvider: PlatformProvider,
    private route: ActivatedRoute,
    private sessionProvider: SessionProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    this.metatagService.setModel(this.item);
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    this.dateAdapter.setLocale(this.sessionProvider.getLanguage());
  }

  public select(date: Date): void {
    this.platformProvider.document.location.href =
      `${this.root}/${this.match(date).id}/iCal`;
  }

  private match(date: Date): ScheduleModel {
    return this.item.schedules?.find((schedule) => {
      return !(schedule.start.setHours(0, 0, 0, 0).valueOf() - date.valueOf());
    });
  }

}
