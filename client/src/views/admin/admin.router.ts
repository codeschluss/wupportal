import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutletterHostComponent } from '@portal/core';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { AddressStepperComponent } from '../../realm/address/address.stepper';
import { CategoryStepperComponent } from '../../realm/category/category.stepper';
import { LanguageStepperComponent } from '../../realm/language/language.stepper';
import { OrganisationStepperComponent } from '../../realm/organisation/organisation.stepper';
import { SuburbStepperComponent } from '../../realm/suburb/suburb.stepper';
import { TagStepperComponent } from '../../realm/tag/tag.stepper';
import { TargetGroupStepperComponent } from '../../realm/target-group/target-group.stepper';
import { UserStepperComponent } from '../../realm/user/user.stepper';
import { AccountPanelComponent } from './account/account.panel';
import { AdminComponent } from './admin.component';
import { AdminGuarding } from './admin.guarding';
import { ApplicationPanelComponent } from './application/application.panel';
import { OrganisationPanelComponent } from './organisation/organisation.panel';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminComponent,
      canActivate: [AdminGuarding],
      children: [
        AccountPanelComponent.routing,
        ApplicationPanelComponent.routing,
        OrganisationPanelComponent.routing,
        {
          path: 'edit',
          component: RoutletterHostComponent,
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
