import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { PlatformRouterModule } from '@wooportal/core';
import { OrganisationMultiComponent } from './organisation/muliti/organisation.multi';
import { PublicComponent } from './public.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      OrganisationMultiComponent.routing
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
