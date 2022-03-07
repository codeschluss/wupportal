import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { catchError, filter, mergeMap, Observable, of, startWith } from 'rxjs';
import { CrudJoiner, CrudResolver, PushedGuarding, RoutingComponent, SessionProvider, SessionResolver, SubscriptionModel, SubscriptionProvider } from '../../../core';

@Component({
  styleUrls: ['favorites.listing.sass'],
  templateUrl: 'favorites.listing.html'
})

export class FavoritesListingComponent
  extends RoutingComponent
  implements OnInit {

  public subscription: Observable<SubscriptionModel>;

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
    this.subscription = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      mergeMap(() => {
        const joiner = CrudJoiner.of(SubscriptionModel);
        const type = this.route.firstChild?.snapshot.params.type;

        if (!type || type === 'events') joiner
          .with('activities').yield('address')
          .with('activities').yield('category')
          .with('activities').yield('provider').yield('organisation')
          .with('activities').yield('schedules')
          .with('activities').yield('titleImage');

        if (!type || type === 'community') joiner
          .with('bloggers').yield('blogs').yield('titleImage')
          .with('topics').yield('blogs').yield('titleImage');

        if (!type || type === 'places') joiner
          .with('organisations').yield('avatar');

        return this.subscriptionProvider.readOne(
          this.sessionProvider.getSubscriptionId()
        ).pipe(mergeMap(
          (item) => this.crudResolver.refine(item, joiner.graph)
        ));
      }),
      catchError(() => of(null))
    ) as Observable<SubscriptionModel>;
  }

  public active(href: string): boolean {
    return this.router.url.startsWith(['', this.routing.path, href].join('/'));
  }

}
