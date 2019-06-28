import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { PlatformRouterModule } from '@wooportal/core';
import { ActivityListComponent } from './lists/activities/activity.list';
import { BlogpostListComponent } from './lists/blogposts/blogpost.list';
import { InfopageListComponent } from './lists/infopages/infopage.list';
import { OrganisationListComponent } from './lists/organisations/organisation.list';
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
      ActivityListComponent.routing,
      ActivityObjectComponent.routing,
      BlogpostListComponent.routing,
      BlogpostObjectComponent.routing,
      HomePageComponent.routing,
      ImprintPageComponent.routing,
      InfopageListComponent.routing,
      InfopageObjectComponent.routing,
      OrganisationListComponent.routing,
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
