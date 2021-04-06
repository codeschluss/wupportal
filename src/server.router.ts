import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LabelResolver, SessionResolver } from './core';
import { SharedComponent } from './views/shared/shared.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'error',
        loadChildren: () => import('./views/error/error.module')
          .then((imported) => imported.ErrorModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./views/admin/admin.mockup')
          .then((imported) => imported.AdminModule)
      },
      {
        path: 'mapview',
        loadChildren: () => import('./views/maps/maps.mockup')
          .then((imported) => imported.MapsModule)
      },
      {
        path: '',
        loadChildren: () => import('./views/public/public.module')
          .then((imported) => imported.PublicModule)
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([
    {
      path: '',
      children: routes,
      component: SharedComponent,
      resolve: {
        labels: LabelResolver,
        session: SessionResolver
      }
    }
  ], {
    initialNavigation: 'enabled'
  })]
})

export class ServerRouter { }
export { ServerRouter as ClientRouter };
