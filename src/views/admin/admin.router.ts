import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TokenResolver } from '@wooportal/core';
import { AdminComponent } from './admin.component';
import { AccountPanelComponent } from './panels/account/account.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';
import { PositioningPanelComponent } from './panels/positioning/positioning.panel';
import { PrivilegesPanelComponent } from './panels/privileges/privileges.panel';
import { ActivityStepperComponent } from './steppers/activity.stepper';
import { AddressStepperComponent } from './steppers/address.stepper';
import { BlogStepperComponent } from './steppers/blog.stepper';
import { CategoryStepperComponent } from './steppers/category.stepper';
import { LanguageStepperComponent } from './steppers/language.stepper';
import { OrganisationStepperComponent } from './steppers/organisation.stepper';
import { PageStepperComponent } from './steppers/page.stepper';
import { SuburbStepperComponent } from './steppers/suburb.stepper';
import { TagStepperComponent } from './steppers/tag.stepper';
import { TargetGroupStepperComponent } from './steppers/target-group.stepper';
import { TopicStepperComponent } from './steppers/topic.stepper';
import { UserStepperComponent } from './steppers/user.stepper';

const routes: Route[] = [
  {
    path: '',
    resolve: {
      tokens: TokenResolver
    },
    // canActivateChild: [AdminGuarding],
    children: [
      AccountPanelComponent.routing,
      ApplicationPanelComponent.routing,
      OrganisationPanelComponent.routing,
      PositioningPanelComponent.routing,
      PrivilegesPanelComponent.routing,
      {
        path: 'edit',
        children: [
          ActivityStepperComponent.routing,
          AddressStepperComponent.routing,
          BlogStepperComponent.routing,
          CategoryStepperComponent.routing,
          LanguageStepperComponent.routing,
          OrganisationStepperComponent.routing,
          PageStepperComponent.routing,
          SuburbStepperComponent.routing,
          TagStepperComponent.routing,
          TargetGroupStepperComponent.routing,
          TopicStepperComponent.routing,
          UserStepperComponent.routing
        ]
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '',
      children: routes,
      component: AdminComponent,
      resolve: {
        tokens: TokenResolver
      }
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }
  ])]
})

export class AdminRouter { }
