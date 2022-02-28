import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BlogpostModel, CrudJoiner, CrudResolver, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['story.component.sass'],
  templateUrl: 'story.component.html'
})

export class StoryComponent
  extends RoutingComponent {

  public get item(): BlogpostModel {
    return this.route.snapshot.data.item
  }

  protected get routing(): Route {
    return {
      path: 'story/:uuid',
      resolve: {
        item: CrudResolver
      },
      data: {
        resolve: {
          item: CrudJoiner.of(BlogpostModel, {
            approved: true
          })
            .with('blogger')
            .with('topic')
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
