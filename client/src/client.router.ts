import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/layout/layout.component';
import { AboutPageComponent } from 'src/pages/about.page.component';
import { HomePageComponent } from 'src/pages/home.page.component';
import { LoginPageComponent } from 'src/pages/login.page.component';
import { ActivityResolver, ConfigurationResolver, I18nResolver } from 'src/services/resolvers';
import { UserStepperComponent } from 'src/steppers/user.stepper.component';
import { ActivityViewComponent } from 'src/views/activity.view.component';

export const ClientRoutes = [

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

  // Steppers
  {
    path: 'user',
    component: UserStepperComponent
  },

  // Views
  {
    path: 'search',
    // component: ResultViewComponent
    component: HomePageComponent
  },
  {
    path: 'activities',
    children: [{
      path: ':uuid',
      component: ActivityViewComponent,
      resolve: { activity: ActivityResolver }
    }]
  },
  {
    path: 'organisation/:uuid',
    redirectTo: 'home'
    // component: ActivityDetailComponent,
    // resolve: { activity: ActivityResolver },
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
    resolve: {
      i18n: I18nResolver,

      activities: ActivityResolver,
      configuration: ConfigurationResolver
    },
  }])],
  providers: [
    I18nResolver,

    ActivityResolver,
    ConfigurationResolver
  ]
})

export class ClientRouter { }
