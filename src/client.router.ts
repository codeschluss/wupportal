import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { I18nResolver, SessionResolver } from '@wooportal/core';
import { LayoutComponent } from './views/shared/layout/layout.component';

const routes: Route[] = [
  {
    path: '',
    resolve: {
      session: SessionResolver,
    },
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./views/admin/admin.module')
          .then((imported) => imported.AdminModule)
      },
      {
        path: 'maps',
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
      path: '',
      children: routes,
      component: LayoutComponent,
      resolve: {
        xliff: I18nResolver
      },
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }
  ], {
    initialNavigation: 'enabled'
  })]
})

export class ClientRouter { }
