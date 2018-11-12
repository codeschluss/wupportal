import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nResolver } from './core/services/resolvers';

const ClientProviders = [
  I18nResolver
];

const ClientResolvers = {
  xlf: I18nResolver
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
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(ClientRoutes)],
  providers: ClientProviders,
})

export class ClientRouter { }
