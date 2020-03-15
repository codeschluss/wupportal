import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AppRouterModule } from '@wooportal/app';
import { MapsComponent } from './maps.component';

const routes: Route[] = [
  MapsComponent.routing
];

@NgModule({
  exports: [AppRouterModule],
  imports: [AppRouterModule.forChild([
    {
      path: '',
      children: routes
    }
  ])]
})

export class MapsRouter { }
