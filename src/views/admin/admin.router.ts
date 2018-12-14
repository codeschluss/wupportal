import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudJoiner, CrudResolver, SessionResolver } from '@portal/core';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { ActivityStepperComponent } from 'src/realm/activity/activity.stepper';
import { ConfigurationModel } from 'src/realm/configuration/configuration.model';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { UserModel } from 'src/realm/user/user.model';
import { AdminComponent } from './admin.component';
import { AccountPanelComponent } from './panels/account.panel';
import { ApplicationPanelComponent } from './panels/application.panel';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
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
      path: '',
      component: AdminComponent,
      resolve: {
        session: SessionResolver
      },
    },
    // AccountPanelComponent.route,
    {
      path: 'account/:uuid',
      component: AccountPanelComponent,
      resolve: {
        activities: CrudResolver,
        organisations: CrudResolver,
        session: SessionResolver,
        user: CrudResolver
      },
      data: {
        activities: CrudJoiner.of(ActivityModel, { filter: null }),
        organisations: CrudJoiner.of(OrganisationModel, { filter: null })
          .with('address').yield('suburb'),
        user: CrudJoiner.of(UserModel)
      }
    },
    // ApplicationPanelComponent.route,
    {
      path: 'application',
      component: ApplicationPanelComponent,
      resolve: {
        configuration: CrudResolver
      },
      data: {
        configuration: CrudJoiner.of(ConfigurationModel)
      }
    },
    {
      path: 'edit',
      // component: EditorDialogComponent,
      children: [
        ActivityStepperComponent.route
      ]
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }
  ])],
})

export class AdminRouter { }
