import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionResolver, CrudResolver, CrudJoiner } from '@portal/core';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { AdminComponent } from './admin.component';
import { AccountPanelComponent } from './panels/account.panel';
import { ApplicationPanelComponent } from './panels/application.panel';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';

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
    AccountPanelComponent.routing,
    ApplicationPanelComponent.routing,
    {
      path: 'edit',
      // component: EditorDialogComponent,
      children: [
        ActivityStepperComponent.routing
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
