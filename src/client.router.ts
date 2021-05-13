import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LabelResolver, LoadingGuarding, SessionResolver } from './core';
import { ErrorNetsplitComponent } from './views/error/netsplit/error.netsplit';
import { SharedComponent } from './views/shared/shared.component';

const routes: Route[] = [
  {
    path: '',
    resolve: {
      labels: LabelResolver
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
      path: 'netsplit',
      canDeactivate: [LoadingGuarding],
      component: ErrorNetsplitComponent
    },
    {
      path: '',
      children: routes,
      component: SharedComponent,
      canActivate: [LoadingGuarding],
      resolve: {
        session: SessionResolver
      }
    }
  ], {
    initialNavigation: 'enabled'
  })]
})

export class ClientRouter { }
