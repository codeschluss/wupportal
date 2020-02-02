import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AppRouterModule } from '@wooportal/app';
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
  exports: [AppRouterModule],
  imports: [AppRouterModule.forChild([
    {
      path: '',
      children: routes
    }
  ])]
})

export class ErrorRouter { }
