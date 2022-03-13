import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ActivityModel, BlogpostModel, CrudJoiner, CrudResolver, OrganisationModel, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['index.component.sass'],
  templateUrl: 'index.component.html'
})

export class IndexComponent
  extends RoutingComponent {

  public get activities(): ActivityModel[] {
    return this.route.snapshot.data.activities || [];
  }

  public get blogposts(): BlogpostModel[] {
    return this.route.snapshot.data.blogposts || [];
  }

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations || [];
  }

  protected get routing(): Route {
    return {
      path: '',
      resolve: {
        activities: CrudResolver,
        blogposts: CrudResolver,
        organisations: CrudResolver
      },
      data: {
        resolve: {
          activities: CrudJoiner.of(ActivityModel, {
            current: true,
            page: 0,
            size: 4,
            dir: 'desc',
            sort: 'created'
          })
            .with('address')
            .with('category')
            .with('provider').yield('organisation')
            .with('schedules')
            .with('titleImage'),
          blogposts: CrudJoiner.of(BlogpostModel, {
            approved: true,
            page: 0,
            size: 4,
            dir: 'desc',
            sort: 'created'
          })
            .with('blogger')
            .with('topic')
            .with('titleImage'),
          organisations: CrudJoiner.of(OrganisationModel, {
            approved: true
          })
            .with('avatar')
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
