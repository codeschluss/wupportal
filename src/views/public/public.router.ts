import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { PlatformRouterModule } from '@wooportal/core';
import { OrganisationListComponent } from './organisation/list/organisation.list';
import { PublicComponent } from './public.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      OrganisationListComponent.routing
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
