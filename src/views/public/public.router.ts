import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { RouterCompat } from '../shared/compat/router/router.compat';
import { PublicComponent } from './public.component';

const routes: Route[] = [
  {
    path: '',
    children: []
  }
];

@NgModule({
  exports: [RouterCompat],
  imports: [RouterCompat.forChild([
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
