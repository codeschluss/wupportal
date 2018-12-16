import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionResolver } from '@portal/core';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { AccountPanelComponent } from './account/account.panel';
import { AdminComponent } from './admin.component';
import { ApplicationPanelComponent } from './application/application.panel';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
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
  ])]
})

export class AdminRouter { }
