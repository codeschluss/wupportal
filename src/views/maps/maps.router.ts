import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { PlatformRouterModule } from '@wooportal/core';
import { MapsComponent } from './maps.component';

const routes: Route[] = [
  MapsComponent.routing,
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  exports: [PlatformRouterModule],
  imports: [PlatformRouterModule.forChild([
    {
      path: '',
      children: routes
    }
  ])]
})

export class MapsRouter { }
