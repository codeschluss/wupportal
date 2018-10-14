import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityEditComponent } from 'src/crud/activity/activity.edit.component';
import { ActivityViewComponent } from 'src/crud/activity/activity.view.component';
import { OrganisationEditComponent } from 'src/crud/organisation/organisation.edit.component';
import { OrganisationViewComponent } from 'src/crud/organisation/organisation.view.component';
import { PageEditComponent } from 'src/crud/page/page.edit.component';
import { PageViewComponent } from 'src/crud/page/page.view.component';
import { UserAuthComponent } from 'src/crud/user/user.login.component';
import { LayoutComponent } from 'src/layout/layout.component';
import { AdminGuard, ProviderGuard, SuperAdminGuard, UserGuard } from 'src/services/guards';
import { ActivityResolver, ConfigurationResolver, I18nResolver, OrganisationResolver, PageResolver } from 'src/services/resolvers';
import { UserEditComponent } from './crud/user/user.edit.component';
import { UserViewComponent } from './crud/user/user.view.component';

/*
 * Default route
 */
export const DefaultRoute = '/pages/view/home';

/*
 * Resolvers for root
 */
const resolvers = {
  activities: ActivityResolver,
  configuration: ConfigurationResolver,
  organisations: OrganisationResolver,
  pages: PageResolver,

  xlf: I18nResolver
};

/*
 * Providers for root
 */
const providers = [

  // guards
  UserGuard,
  ProviderGuard,
  AdminGuard,
  SuperAdminGuard,

  // resolvers
  ActivityResolver,
  ConfigurationResolver,
  OrganisationResolver,
  PageResolver,

  // translations
  I18nResolver
];

/*
 * Public routes
 */
const routes = [

  // crud: activities
  {
    path: 'activities',
    // component: ResultViewComponent,
    children: [
      {
        path: 'view/:uuid',
        component: ActivityViewComponent,
        resolve: { activity: ActivityResolver }
      },
      {
        path: 'edit/:uuid',
        canActivate: [SuperAdminGuard, AdminGuard, ProviderGuard],
        component: ActivityEditComponent,
        resolve: { activity: ActivityResolver }
      }
    ]
  },

  // crud: organisations
  {
    path: 'organisations',
    // component: ResultViewComponent,
    children: [
      {
        path: 'view/:uuid',
        component: OrganisationViewComponent,
        resolve: { organisation: OrganisationResolver }
      },
      {
        path: 'edit/:uuid',
        canActivate: [SuperAdminGuard, AdminGuard],
        component: OrganisationEditComponent,
        resolve: { organisation: OrganisationResolver }
      }
    ]
  },

  // crud: pages
  {
    path: 'pages',
    children: [
      {
        path: 'view/:page',
        component: PageViewComponent
      },
      {
        path: 'edit/:page',
        canActivate: [SuperAdminGuard],
        component: PageEditComponent
      }
    ]
  },

  // crud: user
  {
    path: 'user',
    component: UserAuthComponent,
    children: [
      {
        path: 'view/:uuid',
        component: UserViewComponent
      },
      {
        path: 'edit',
        canActivate: [UserGuard],
        component: UserEditComponent,
        children: [
          {
            path: ':uuid',
            canActivate: [SuperAdminGuard],
            component: UserEditComponent
          }
        ]
      }
    ]
  },

  // search
  {
    path: 'search',
    children: [{
      path: ':query',
      children: []
    }]
  },

  // default
  {
    path: '**',
    redirectTo: DefaultRoute
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([{
    path: '',
    children: routes,
    component: LayoutComponent,
    resolve: resolvers,
  }])],
  providers: providers
})

export class ClientRouter { }
