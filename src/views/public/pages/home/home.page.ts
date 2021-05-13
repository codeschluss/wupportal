import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivityModel, CrudJoiner, CrudResolver, MetatagService } from '../../../../core';
import { MarkupModel } from '../../../../core/models/markup.model';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.sass', 'home.page.sass'],
  templateUrl: 'home.page.html'
})

export class HomePageComponent
  extends BasePage {

  protected path: string = '';

  public get activities(): ActivityModel[] {
    return this.route.snapshot.data.activities;
  }

  public get content(): string {
    return this.route.snapshot.data.markups?.find((markup) => {
      return markup.tagId === 'homepage'
    })?.content || 'homepage';
  }

  public get name(): Observable<string> {
    return this.metatagService.name;
  }

  public get tagline(): string {
    return this.route.snapshot.data.configuration
      .find((c) => c.item === 'portalSubtitle').value;
  }

  protected get routing(): Route {
    return {
      path: this.path,
      resolve: {
        activities: CrudResolver,
        markups: CrudResolver
      },
      data: {
        resolve: {
          markups: CrudJoiner.of(MarkupModel, {
            required: true
          }),
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
    private metatagService: MetatagService,
    private route: ActivatedRoute
  ) {
    super();
  }

}
