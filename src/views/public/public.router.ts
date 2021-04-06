import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ConfigurationModel, CrudJoiner, CrudResolver } from '../../core';
import { ActivityListingComponent } from './listings/activities/activity.listing';
import { BlogpostListingComponent } from './listings/blogposts/blogpost.listing';
import { InfopageListingComponent } from './listings/infopages/infopage.listing';
import { OrganisationListingComponent } from './listings/organisations/organisation.listing';
import { ActivityObjectComponent } from './objects/activity/activity.object';
import { BlogpostObjectComponent } from './objects/blogpost/blogpost.object';
import { InfopageObjectComponent } from './objects/infopage/infopage.object';
import { OrganisationObjectComponent } from './objects/organisation/organisation.object';
import { HomePageComponent } from './pages/home/home.page';
import { ImprintPageComponent } from './pages/imprint/imprint.page';
import { LoginPageComponent } from './pages/login/login.page';
import { LogoutPageComponent } from './pages/logout/logout.page';
import { NotificationsPageComponent } from './pages/notifications/notifications.page';
import { PoliciesPageComponent } from './pages/policies/policies.page';
import { RegisterPageComponent } from './pages/register/register.page';
import { SearchPageComponent } from './pages/search/search.page';
import { PublicComponent } from './public.component';

const listingRoutes: Route[] = [
  ActivityListingComponent.routing,
  BlogpostListingComponent.routing,
  InfopageListingComponent.routing,
  OrganisationListingComponent.routing
];

const objectRoutes: Route[] = [
  ActivityObjectComponent.routing,
  BlogpostObjectComponent.routing,
  InfopageObjectComponent.routing,
  OrganisationObjectComponent.routing
];

const pageRoutes: Route[] = [
  HomePageComponent.routing,
  ImprintPageComponent.routing,
  LoginPageComponent.routing,
  LogoutPageComponent.routing,
  NotificationsPageComponent.routing,
  PoliciesPageComponent.routing,
  RegisterPageComponent.routing,
  SearchPageComponent.routing
];

const routes: Route[] = [
  {
    path: '',
    children: [
      ...listingRoutes,
      ...objectRoutes,
      ...pageRoutes
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
      component: PublicComponent,
      resolve: {
        configuration: CrudResolver
      },
      data: {
        resolve: {
          configuration: CrudJoiner.of(ConfigurationModel, {
            required: true
          })
        }
      }
    }
  ])]
})

export class PublicRouter { }
