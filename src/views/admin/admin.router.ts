import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TokenResolver } from '@wooportal/core';
import { AdminComponent } from './admin.component';
import { AdminGuarding } from './admin.guarding';
import { AccountPanelComponent } from './panels/account/account.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { InformationPanelComponent } from './panels/information/information.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';
import { PositioningPanelComponent } from './panels/positioning/positioning.panel';
import { PrivilegesPanelComponent } from './panels/privileges/privileges.panel';
import { TaxonomyPanelComponent } from './panels/taxonomy/taxonomy.panel';
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
    children: [
      AccountPanelComponent.routing,
      ApplicationPanelComponent.routing,
      InformationPanelComponent.routing,
      OrganisationPanelComponent.routing,
      PositioningPanelComponent.routing,
      PrivilegesPanelComponent.routing,
      TaxonomyPanelComponent.routing,
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
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '',
      children: routes,
      component: AdminComponent,
      canActivateChild: [AdminGuarding],
      resolve: {
        tokens: TokenResolver
      }
    }
  ])]
})

export class AdminRouter { }
