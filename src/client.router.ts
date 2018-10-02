import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/core/layout.component';
import { PageComponent } from 'src/core/page.component';
import { AboutPageComponent } from 'src/pages/about.page.component';
import { HomePageComponent } from 'src/pages/home.page.component';
import { LoginPageComponent } from 'src/pages/login.page.component';
import { ActivityResolver, ConfigurationResolver, I18nResolver, OrganisationResolver, PageResolver } from 'src/services/resolvers';
import { UserStepperComponent } from 'src/steppers/user.stepper.component';
import { ActivityViewComponent } from 'src/views/activity.view.component';
import { OrganisationViewComponent } from 'src/views/organisation.view.component';
import { ResultViewComponent } from 'src/views/result.view.component';

/*
 * Resolvers for root
 */
const ClientResolvers = {
  I18nResolver,

  activities: ActivityResolver,
  configuration: ConfigurationResolver,
  organisations: OrganisationResolver,
  pages: PageResolver
};

/*
 * Providers for root
 */
const ClientProviders = [
  I18nResolver,

  ActivityResolver,
  ConfigurationResolver,
  OrganisationResolver,
  PageResolver
];

/*
 * Routes under root
 */
const ClientRoutes = [

  // Pages
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'pages',
    children: [{
      path: ':page',
      component: PageComponent
    }]
  },

  // Steppers
  {
    path: 'user',
    component: UserStepperComponent
  },

  // Views
  {
    path: 'search',
    component: ResultViewComponent
  },
  {
    path: 'activities',
    component: ResultViewComponent,
    children: [{
      path: ':uuid',
      component: ActivityViewComponent,
      resolve: { activity: ActivityResolver }
    }]
  },
  {
    path: 'organisations',
    component: ResultViewComponent,
    children: [{
      path: ':uuid',
      component: OrganisationViewComponent,
      resolve: { organisation: OrganisationResolver }
    }]
  },

  // catchall
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot([{
    path: '',
    children: ClientRoutes,
    component: LayoutComponent,
    resolve: ClientResolvers,
  }])],
  providers: ClientProviders
})

export class ClientRouter { }
