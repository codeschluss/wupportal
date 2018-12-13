import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionResolver, I18nResolver } from 'libs/core';

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
        path: '',
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
