import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BlogpostModel, CrudJoiner, CrudResolver, MetatagService, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['story.component.sass'],
  templateUrl: 'story.component.html'
})

export class StoryComponent
  extends RoutingComponent
  implements OnInit {

  public get item(): BlogpostModel {
    return this.route.snapshot.data.item;
  }

  protected get routing(): Route {
    var test = {
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
              .yield('avatar')
            .with('topic')
            .with('titleImage')
        }
      }
    };
    return test
  }

  public constructor(
    private metatagService: MetatagService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.metatagService.setModel(this.item);
  }
}
