import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nResolver, SessionResolver } from '@portal/core';
import { LayoutComponent } from './views/layout/layout.component';

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
