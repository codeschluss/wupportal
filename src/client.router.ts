import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudJoiner, CrudResolver, I18nResolver, SessionResolver } from 'libs/core';
import { OrganisationModel } from './realm/organisation/organisation.model';
import { LayoutComponent } from './views/layout/layout.component';
import { LoginComponent } from './views/public/login/login.component';
import { RegisterComponent } from './views/public/login/register.component';

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
        path: '',
        component: LayoutComponent,
        loadChildren: './views/public/public.module#PublicModule'
      },
      {
        path: 'admin',
        component: LayoutComponent,
        loadChildren: './views/admin/admin.module#AdminModule'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent,
        resolve: {
          organisations: CrudResolver
        },
        data: {
          organisations: CrudJoiner.of(OrganisationModel)
        }
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
  imports: [RouterModule.forRoot(ClientRoutes)]
})

export class ClientRouter { }
