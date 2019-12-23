import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Headers } from '@wooportal/core';
import { Observable } from 'rxjs';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'home.page.scss'],
  templateUrl: 'home.page.html'
})

export class HomePageComponent extends BasePage {

  protected path: string = '';

  public get activities(): ActivityModel[] {
    return this.route.snapshot.data.activities;
  }

  public get name(): Observable<string> {
    return this.headers.name;
  }

  public get tagline(): string {
    return this.route.snapshot.data.configuration
      .find((c) => c.item === 'portalSubtitle').value;
  }

  protected get routing(): Route {
    return {
      path: this.path,
      resolve: {
        activities: CrudResolver
      },
      data: {
        resolve: {
          activities: CrudJoiner.of(ActivityModel, {
            current: true,
            page: 0,
            size: 10
          })
            .with('address').yield('suburb')
            .with('category')
            .with('schedules')
        }
      }
    };
  }

  public constructor(
    private headers: Headers,
    private route: ActivatedRoute
  ) {
    super();
  }

}
