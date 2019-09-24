import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { I18nResolver, PlatformGuarding, SessionResolver } from '@wooportal/core';
import { ErrorNetsplitComponent } from './error/netsplit/error.netsplit';
import { LayoutComponent } from './views/shared/layout/layout.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'error',
        loadChildren: () => import('./error/error.module')
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
      canDeactivate: [PlatformGuarding],
      component: ErrorNetsplitComponent
    },
    {
      path: '',
      children: routes,
      component: LayoutComponent,
      canActivate: [PlatformGuarding],
      resolve: {
        session: SessionResolver,
        xliff: I18nResolver
      }
    }
  ], {
    initialNavigation: 'enabled'
  })]
})

export class ClientRouter { }
