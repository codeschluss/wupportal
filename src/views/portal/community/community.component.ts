import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BlogpostModel, CrudJoiner, CrudResolver, RoutingComponent, TopicModel } from '../../../core';

@Component({
  styleUrls: ['community.component.sass'],
  templateUrl: 'community.component.html'
})

export class CommunityComponent
  extends RoutingComponent {

    public get blogposts(): BlogpostModel[] {
      return this.route.snapshot.data.blogposts;
    }

    public get topics(): TopicModel[] {
      return this.route.snapshot.data.topics;
    }

    protected get routing(): Route {
      return {
        path: 'community',
        resolve: {
          blogposts: CrudResolver,
          topics: CrudResolver
        },
        data: {
          resolve: {
            blogposts: CrudJoiner.of(BlogpostModel, {
              page: 0,
              size: 4
            })
              .with('blogger')
              .with('topic'),
            topics: CrudJoiner.of(TopicModel, {
              page: 0,
              size: 5
            })
              .with('blogs')
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
