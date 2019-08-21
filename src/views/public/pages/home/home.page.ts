import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { ClientPackage } from '../../../../utils/package';
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

  public get title(): string {
    return ClientPackage.config.defaults.title;
  }

  protected get routing(): Route {
    return {
      path: this.path,
      resolve: {
        activities: CrudResolver
      },
      data: {
        resolve: {
          activities: CrudJoiner.of(ActivityModel, { page: 0, size: 10 })
            .with('address').yield('suburb')
            .with('category')
            .with('schedules')
        }
      }
    };
  }

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

}
