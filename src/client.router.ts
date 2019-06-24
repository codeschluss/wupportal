import { NgModule, Type } from '@angular/core';
import { Resolve, Route, RouterModule } from '@angular/router';
import { I18nResolver, SessionResolver } from '@wooportal/core';
import { LayoutComponent } from './views/shared/layout/layout.component';

const resolvers: { [key: string]: Type<Resolve<any>> } = {
  session: SessionResolver,
  xliff: I18nResolver
};

const routes: Route[] = [
  {
    path: '',
    resolve: resolvers,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./views/admin/admin.module')
          .then((imported) => imported.AdminModule)
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
      resolve: resolvers,
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }
  ])]
})

export class ClientRouter { }
