import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nResolver, SessionResolver } from '@wooportal/core';
import { LayoutComponent } from './views/layout/layout.component';

const ClientResolvers = {
  session: SessionResolver,
  xliff: I18nResolver
};

const ClientRoutes = [
  {
    path: '',
    resolve: ClientResolvers,
    children: [
      {
        path: '',
        loadChildren: './views/public/public.module#PublicModule'
      },
      {
        path: 'admin',
        loadChildren: './views/admin/admin.module#AdminModule'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(
    [{
      path: '',
      children: ClientRoutes,
      component: LayoutComponent,
      resolve: ClientResolvers,
    }]
  )]
})

export class ClientRouter { }
