import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionResolver, CrudResolver, CrudJoiner } from '@portal/core';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { AddressStepperComponent } from '../../realm/address/address.stepper';
import { CategoryStepperComponent } from '../../realm/category/category.stepper';
import { LanguageStepperComponent } from '../../realm/language/language.stepper';
import { OrganisationStepperComponent } from '../../realm/organisation/organisation.stepper';
import { SuburbStepperComponent } from '../../realm/suburb/suburb.stepper';
import { TagStepperComponent } from '../../realm/tag/tag.stepper';
import { TargetGroupStepperComponent } from '../../realm/target-group/target-group.stepper';
import { UserStepperComponent } from '../../realm/user/user.stepper';
import { AdminComponent } from './admin.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { ApplicationPanelComponent } from './application/application.panel';
import { OrganisationPanelComponent } from './organisation/organisation.panel';
import { AccountPanelComponent } from './account/account.panel';

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
    OrganisationPanelComponent.routing,
    {
      path: 'edit',
      // component: EditorDialogComponent,
      children: [
        ActivityStepperComponent.routing,
        AddressStepperComponent.routing,
        CategoryStepperComponent.routing,
        LanguageStepperComponent.routing,
        OrganisationStepperComponent.routing,
        SuburbStepperComponent.routing,
        TagStepperComponent.routing,
        TargetGroupStepperComponent.routing,
        UserStepperComponent.routing
      ]
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }
  ])]
})

export class AdminRouter { }
