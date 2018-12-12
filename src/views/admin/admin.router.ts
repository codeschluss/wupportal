import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudJoiner, CrudResolver } from '@portal/core';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { ActivityStepperComponent } from 'src/realm/activity/activity.stepper';
import { AddressModel } from 'src/realm/address/address.model';
import { CategoryModel } from 'src/realm/category/category.model';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { ProviderModel } from 'src/realm/provider/provider.model';
import { ScheduleModel } from 'src/realm/schedule/schedule.model';
import { SuburbModel } from 'src/realm/suburb/suburb.model';
import { TagModel } from 'src/realm/tag/tag.model';
import { TargetGroupModel } from 'src/realm/target-group/target-group.model';
import { UserModel } from 'src/realm/user/user.model';
import { AdminComponent } from './admin.component';

const AdminRoutes = [
  {
    path: 'main',
    component: AdminComponent,
    canActivate: [],
    children: [ActivityStepperComponent.routes]
  },
  {
    path: 'test',
    component: AdminComponent,
    resolve: { activities: CrudResolver },
    data: {
      activities: CrudJoiner.of(ActivityModel)
        .with(AddressModel).yield(SuburbModel)
        .with(CategoryModel)
        .with(OrganisationModel).yield(AddressModel).yield(SuburbModel)
        .with(ScheduleModel)
        .with(TagModel)
        .with(TargetGroupModel)
        .with(UserModel).yield(ProviderModel)
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(AdminRoutes)],
})

export class AdminRouter { }

// const routes = [
//   {
//     path: 'account',
//     canActivate: ['UserGuard'],
//     component: 'AccountDeckComponent',
//     children: [
//       {
//         path: '',
//         component: 'AccountFormComponent'
//       },
//       {
//         path: 'activities',
//         canActivate: ['OrganisationUserGuard'],
//         component: 'ActivityListComponent'
//       },
//       {
//         path: 'organisations',
//         component: 'OrganisationListComponent'
//       }
//     ]
//   },
//   {
//     path: 'organisations',
//     canActivate: ['OrganisationAdminGuard', 'SuperUserGuard'],
//     component: 'ContentDeckComponent',
//     children: [
//       {
//         path: '',
//         component: 'OrganisationListComponent'
//       },
//       {
//         path: 'activities',
//         component: 'ActivityListComponent'
//       },
//       {
//         path: 'providers',
//         component: 'ProviderListComponent'
//       },
//       {
//         path: 'requests',
//         component: 'RequestListComponent'
//       }
//     ]
//   },
//   {
//     path: 'application',
//     canActivate: ['SuperUserGuard'],
//     component: 'PortalDeckComponent',
//     children: [
//       {
//         path: 'addresses',
//         component: 'AddressListComponent'
//       },
//       {
//         path: 'configuration',
//         component: 'ConfigurationFormComponent'
//       },
//       {
//         path: 'categories',
//         component: 'CategoryListComponent'
//       },
//       {
//         path: 'keywords',
//         component: 'KeywordsListComponent'
//       },
//       {
//         path: 'suburbs',
//         component: 'SuburbListComponent'
//       },
//       {
//         path: 'targetgroups',
//         component: 'TargetGroupListComponent'
//       },
//       {
//         path: 'translations',
//         component: 'TranslationsListComponent'
//       }
//     ]
//   }
// ];
