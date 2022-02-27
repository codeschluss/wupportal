import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ConfigurationModel, CrudJoiner, CrudResolver, StaticPageModel } from '../../core';
import { CommunityComponent } from './community/community.component';
import { CommunityListingComponent } from './community/community.listing';
import { EventsComponent } from './events/events.component';
import { EventsListingComponent } from './events/events.listing';
import { FavoritesListingComponent } from './favorites/favorites.listing';
import { IndexComponent } from './index/index.component';
import { MapComponent } from './map/map.component';
import { PortalComponent } from './portal.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { StaticPageComponent } from './static-page/static-page.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      CommunityComponent.routing,
      CommunityListingComponent.routing,
      EventsComponent.routing,
      EventsListingComponent.routing,
      FavoritesListingComponent.routing,
      IndexComponent.routing,
      MapComponent.routing,
      // RegisterComponent.routing,
      // SearchComponent.routing,
      SitemapComponent.routing,
      StaticPageComponent.routing
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/error/404'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '',
      children: routes,
      component: PortalComponent,
      resolve: {
        configuration: CrudResolver,
        staticPages: CrudResolver
      },
      data: {
        resolve: {
          configuration: CrudJoiner.of(ConfigurationModel, {
            required: true
          }),
          staticPages: CrudJoiner.of(StaticPageModel)
            .with('titleImage')
        }
      }
    }
  ])]
})

export class PortalRouter { }
