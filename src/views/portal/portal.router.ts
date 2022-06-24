import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ConfigurationModel, CrudJoiner, CrudResolver, StaticPageModel } from '../../core';
import { CommunityComponent } from './community/community.component';
import { CommunityListingComponent } from './community/community.listing';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { EventsListingComponent } from './events/events.listing';
import { FavoritesListingComponent } from './favorites/favorites.listing';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { IndexComponent } from './index/index.component';
import { PlaceComponent } from './place/place.component';
import { PortalComponent } from './portal.component';
import { RegisterPageComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { StaticPageComponent } from './static-page/static-page.component';
import { StoryComponent } from './story/story.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      CommunityComponent.routing,
      CommunityListingComponent.routing,
      EventComponent.routing,
      EventsComponent.routing,
      EventsListingComponent.routing,
      FavoritesListingComponent.routing,
      ForgotPasswordComponent.routing,
      IndexComponent.routing,
      PlaceComponent.routing,
      RegisterPageComponent.routing,
      SearchComponent.routing,
      SitemapComponent.routing,
      StaticPageComponent.routing,
      StoryComponent.routing
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
            .with('videos').yield('thumbnail')
            .with('images')
        }
      }
    }
  ])]
})

export class PortalRouter { }
