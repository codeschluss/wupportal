import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, merge, mergeMap, Observable, of } from 'rxjs';
import { BlogpostModel, BlogpostProvider, CrudJoiner, CrudResolver, RoutingComponent, TopicModel } from '../../../core';

@Component({
  styleUrls: ['community.listing.sass'],
  templateUrl: 'community.listing.html'
})

export class CommunityListingComponent
  extends RoutingComponent
  implements OnInit {

  public blogposts: Observable<BlogpostModel[]>;

  public get topic(): TopicModel {
    const topic = this.route.snapshot.data.topics?.find((item) => {
      return item.id === this.route.snapshot.params.topicId;
    });

    if (!topic) this.router.navigate(['/', 'error', 404]);
    return topic;
  }

  public get topics(): TopicModel[] {
    return this.route.snapshot.data.topics || [];
  }

  protected get routing(): Route {
    return {
      path: 'community/:topicId',
      resolve: {
        topics: CrudResolver
      },
      data: {
        resolve: {
          topics: CrudJoiner.of(TopicModel)
        }
      }
    };
  }

  public constructor(
    private blogpostProvider: BlogpostProvider,
    private crudResolver: CrudResolver,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    const joiner = CrudJoiner.of(BlogpostModel)
      .with('blogger')
      .with('titleImage')
      .with('topic');

    this.blogposts = merge(
      this.route.params,
      this.route.queryParams
    ).pipe(
      mergeMap(() => this.blogpostProvider.readAll({
        dir: 'desc',
        embeddings: CrudJoiner.to(joiner.graph),
        page: 0,
        size: 10,
        sort: this.route.snapshot.queryParams.sort,
        topics: [this.route.snapshot.params.topicId]
      }).pipe(
        mergeMap((items) => this.crudResolver.refine(items, joiner.graph)),
        catchError(() => of([]))
      ))
    ) as Observable<BlogpostModel[]>;
  }

}
