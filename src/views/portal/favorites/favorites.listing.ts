import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ActivityModel, BloggerModel, CrudModel, CrudResolver, OrganisationModel, PushedGuarding, RoutingComponent, SessionProvider, SessionResolver, SubscriptionProvider, TopicModel } from '../../../core';

@Component({
  styleUrls: ['favorites.listing.sass'],
  templateUrl: 'favorites.listing.html'
})

export class FavoritesListingComponent
  extends RoutingComponent
  implements OnInit {

  // public subscription: Observable<SubscriptionModel>;

  protected get routing(): Route {
    return {
      path: 'favorites',
      canActivate: [
        PushedGuarding
      ],
      resolve: {
        session: SessionResolver
      },
      children: [
        {
          path: ''
        },
        {
          path: ':type'
        }
      ]
    };
  }

  public constructor(
    private crudResolver: CrudResolver,
    private route: ActivatedRoute,
    private router: Router,
    private sessionProvider: SessionProvider,
    private subscriptionProvider: SubscriptionProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    // this.subscription = merge(
    //   ...this.route.children.map((c) => c.params)
    // ).pipe(
    //   map((params) => params.type),
    //   tap(console.log),
    //   mergeMap((type) => {
    //     const joiner = CrudJoiner.of(SubscriptionModel);

    //     if (!type || type === 'events') joiner
    //       .with('activities').yield('address').yield('suburb')
    //       .with('activities').yield('category')
    //       .with('activities').yield('provider').yield('organisation')
    //       .with('activities').yield('schedules')
    //       .with('activities').yield('titleImage');

    //     // if (!type || type === 'community') joiner
    //     //   .with('bloggers').yield('blogposts')
    //     //   .with('topics').yield('blogposts');

    //     if (!type || type === 'community') joiner
    //       // .with('organisations').yield('avatar')
    //       .with('organisations').yield('address').yield('suburb')
    //       .with('organisations').yield('images')
    //       .with('organisations').yield('videos').yield('thumbnail');

    //     return this.subscriptionProvider.readOne(
    //       this.sessionProvider.getSubscriptionId()
    //     ).pipe(mergeMap(
    //       (item) => this.crudResolver.refine(item, joiner.graph)
    //     ));
    //   }),
    //   catchError(() => of(null))
    // ) as Observable<SubscriptionModel>;
  }

  public active(href: string): boolean {
    return this.router.url.startsWith('/favorites/' + href);
  }

  public unsubscribe(item: CrudModel): void {
    (() => {
      switch (item.constructor) {
        case ActivityModel:
          return this.subscriptionProvider.unlinkActivities;

        case BloggerModel:
          return this.subscriptionProvider.unlinkBloggers;

        case OrganisationModel:
          return this.subscriptionProvider.unlinkOrganisations;

        case TopicModel:
          return this.subscriptionProvider.unlinkTopics;
      }
    })()(
      this.sessionProvider.getSubscriptionId(),
      [item.id]
    ).subscribe(() => {
      this.sessionProvider.delFollowed(item.id);
    });
  }

}
