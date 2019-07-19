import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
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
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '',
      children: routes
    }
  ])]
})

export class MapsRouter { }
