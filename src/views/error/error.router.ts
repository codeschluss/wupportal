import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
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
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '',
      children: routes
    }
  ])]
})

export class ErrorRouter { }
