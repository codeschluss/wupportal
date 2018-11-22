import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nResolver } from './core/i18n/i18n.resolver';
import { SessionResolver } from './core/session/session.resolver';

const ClientResolvers = {
  session: SessionResolver,
  xlf: I18nResolver
};

const ClientRoutes = [
  {
    path: '',
    resolve: ClientResolvers,
    children: [
      {
        path: 'admin',
        loadChildren: './views/admin/admin.module#AdminModule'
      },
      {
        path: 'public',
        loadChildren: './views/public/public.module#PublicModule'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'public'
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(ClientRoutes)]
})

export class ClientRouter { }
