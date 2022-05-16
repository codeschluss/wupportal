import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BlogpostModel, CrudJoiner, CrudResolver, RoutingComponent, TopicModel } from '../../../core';

@Component({
  styleUrls: ['community.component.sass'],
  templateUrl: 'community.component.html'
})

export class CommunityComponent
  extends RoutingComponent {

    public get blogposts(): BlogpostModel[] {
      return this.route.snapshot.data.blogposts || [];
    }

    public get topics(): TopicModel[] {
      return this.route.snapshot.data.topics?.map((topic) => {
        topic.blogposts = topic.blogposts.map((blogpost) => {
          blogpost.topic = topic;
          return blogpost;
        });

        return topic;
      }) || [];
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
              size: 4,
              dir: 'desc',
              sort: 'created'
            })
              .with('blogger')
              .with('titleImage')
              .with('topic'),
            topics: CrudJoiner.of(TopicModel, {})
              .with('blogs').yield('titleImage')
          }
        }
      };
    }

    public constructor(
      private route: ActivatedRoute,
      private router: Router

    ) {
      super();
    }
}
