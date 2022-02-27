import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TokenResolver } from '../../core';
import { AdminComponent } from './admin.component';
import { AdminGuarding } from './admin.guarding';
import { AccountPanelComponent } from './panels/account/account.panel';
import { AnalyticsPanelComponent } from './panels/analytics/analytics.panel';
import { ApplicationPanelComponent } from './panels/application/application.panel';
import { InformationPanelComponent } from './panels/information/information.panel';
import { MessagingPanelComponent } from './panels/messaging/messaging.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';
import { PositioningPanelComponent } from './panels/positioning/positioning.panel';
import { PrivilegesPanelComponent } from './panels/privileges/privileges.panel';
import { TaxonomyPanelComponent } from './panels/taxonomy/taxonomy.panel';
import { TranslatePanelComponent } from './panels/translate/translate.panel';
import { ActivityStepperComponent } from './steppers/activity.stepper';
import { AddressStepperComponent } from './steppers/address.stepper';
import { BlogpostStepperComponent } from './steppers/blogposts.stepper';
import { CategoryStepperComponent } from './steppers/category.stepper';
import { LanguageStepperComponent } from './steppers/language.stepper';
import { OrganisationStepperComponent } from './steppers/organisation.stepper';
import { SocialMediaStepperComponent } from './steppers/social-media.stepper';
import { StaticPageStepperComponent } from './steppers/static-pages.stepper';
import { SubscriptionTypeStepperComponent } from './steppers/subscription-type.stepper';
import { SuburbStepperComponent } from './steppers/suburb.stepper';
import { TargetGroupStepperComponent } from './steppers/target-group.stepper';
import { TopicStepperComponent } from './steppers/topic.stepper';
import { UserStepperComponent } from './steppers/user.stepper';

const routes: Route[] = [
  {
    path: '',
    children: [
      AccountPanelComponent.routing,
      AnalyticsPanelComponent.routing,
      ApplicationPanelComponent.routing,
      InformationPanelComponent.routing,
      MessagingPanelComponent.routing,
      OrganisationPanelComponent.routing,
      PositioningPanelComponent.routing,
      PrivilegesPanelComponent.routing,
      TaxonomyPanelComponent.routing,
      TranslatePanelComponent.routing,
      {
        path: 'edit',
        children: [
          ActivityStepperComponent.routing,
          AddressStepperComponent.routing,
          BlogpostStepperComponent.routing,
          CategoryStepperComponent.routing,
          LanguageStepperComponent.routing,
          OrganisationStepperComponent.routing,
          SocialMediaStepperComponent.routing,
          StaticPageStepperComponent.routing,
          SubscriptionTypeStepperComponent.routing,
          SuburbStepperComponent.routing,
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
