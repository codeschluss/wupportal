import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { AdminGuard, ProviderGuard, SuperAdminGuard, UserGuard } from './core/services/guards';
import { ActivityResolver, ConfigurationResolver, I18nResolver, OrganisationResolver } from './core/services/resolvers';

const ClientProviders = [
  UserGuard,
  ProviderGuard,
  AdminGuard,
  SuperAdminGuard,

  ActivityResolver,
  ConfigurationResolver,
  OrganisationResolver,

  I18nResolver
];

const ClientResolvers = {
  xlf: I18nResolver
};

const ClientRoutes = [
  {
    path: '',
    component: ClientComponent,
    resolvers: ClientResolvers,
    children: [
      {
        path: '',
        loadChildren: 'src/views/public/public.client.module#PublicClientModule'
      },
      {
        path: 'admin',
        loadChildren: 'src/views/admin/admin.client.module#AdminClientModule'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(ClientRoutes)],
  providers: ClientProviders,
})

export class ClientRouter { }
