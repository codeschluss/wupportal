import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { PlatformRouterModule } from '@wooportal/core';
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
import { PoliciesPageComponent } from './pages/policies/policies.page';
import { PublicComponent } from './public.component';
import { SearchDummyComponent } from './search/search.dummy';

const routes: Route[] = [
  {
    path: '',
    children: [
      ActivityListingComponent.routing,
      ActivityObjectComponent.routing,
      BlogpostListingComponent.routing,
      BlogpostObjectComponent.routing,
      HomePageComponent.routing,
      ImprintPageComponent.routing,
      InfopageListingComponent.routing,
      InfopageObjectComponent.routing,
      OrganisationListingComponent.routing,
      OrganisationObjectComponent.routing,
      PoliciesPageComponent.routing,

      // TODO: remove
      SearchDummyComponent.routing
    ]
  }
];

@NgModule({
  exports: [PlatformRouterModule],
  imports: [PlatformRouterModule.forChild([
    {
      path: '',
      children: routes,
      component: PublicComponent
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }
  ])]
})

export class PublicRouter { }
