import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LabelResolver, LoadingGuarding, PushedResolver, SessionResolver } from './core';
import { ErrorNetsplitComponent } from './views/error/netsplit/error.netsplit';
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
        loadChildren: () => import('./views/admin/admin.module')
          .then((imported) => imported.AdminModule)
      },
      {
        path: 'mapview',
        loadChildren: () => import('./views/maps/maps.module')
          .then((imported) => imported.MapsModule)
      },
      {
        path: 'ublog',
        loadChildren: () => import('./views/ublog/ublog.module')
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
      path: 'netsplit',
      canDeactivate: [LoadingGuarding],
      component: ErrorNetsplitComponent
    },
    {
      path: '',
      children: routes,
      component: GlobalComponent,
      canActivate: [LoadingGuarding]
    }
  ], {
    initialNavigation: 'enabled'
  })]
})

export class ClientRouter { }
