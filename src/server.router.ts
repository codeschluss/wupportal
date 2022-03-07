import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LabelResolver, PushedResolver, SessionResolver } from './core';
import { GlobalComponent } from './views/global/global.component';

const routes: Route[] = [
  {
    path: '',
    resolve: {
      labels: LabelResolver,
      pushed: PushedResolver,
      session: SessionResolver
    },
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
        path: 'ublog',
        loadChildren: () => import('./views/ublog/ublog.mockup')
          .then((imported) => imported.UblogModule)
      },
      {
        path: '',
        loadChildren: () => import('./views/portal/portal.module')
          .then((imported) => imported.PortalModule)
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
      component: GlobalComponent
    }
  ], {
    initialNavigation: 'enabled'
  })]
})

export class ServerRouter { }
export { ServerRouter as ClientRouter };
