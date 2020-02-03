import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AppRouterModule } from '@wooportal/app';
import { LabelsResolver, LoadingGuarding, SessionResolver } from '@wooportal/core';
import { ErrorNetsplitComponent } from './views/error/netsplit/error.netsplit';
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
  exports: [AppRouterModule],
  imports: [AppRouterModule.forRoot([
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
        session: SessionResolver,
        xliff: LabelsResolver
      }
    }
  ], {
    initialNavigation: 'enabled'
  })]
})

export class ClientRouter { }
