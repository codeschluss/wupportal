import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { PlatformRouterModule } from '@wooportal/core';
import { ErrorResponseComponent } from './response/error.response';

const routes: Route[] = [
  {
    path: ':code',
    component: ErrorResponseComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
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

export class ErrorRouter { }
