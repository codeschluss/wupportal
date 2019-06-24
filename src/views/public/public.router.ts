import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { RouterCompat } from '../shared/compat/router/router.compat';
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
