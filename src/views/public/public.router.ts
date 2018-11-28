import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './layout/about.component';
import { ActivityListComponent } from './activity/activity.list.component';
import { ActivityViewComponent } from './activity/activity.view.component';
import { LayoutComponent } from '../layout/layout.component';
import { OrganisationListComponent } from './organisation/organisation.list.component';
import { OrganisationViewComponent } from './organisation/organisation.view.component';
import { BlogListComponent } from './blog/blog.list.component';

const PublicProviders = [
];

const PublicResolvers = {
};

const PublicRoutes = [
  {
    path: 'home',
    component: AboutComponent,
  },
  {
    path: 'activities',
    children: [
      {
        path: 'view/:id',
        component: ActivityViewComponent
      },
      {
        path: 'list',
        component: ActivityListComponent,
      },
      {
        path: '',
        component: ActivityListComponent,
      }
    ]
  }, {
  path: 'organisations',
  children: [
      {
        path: 'list',
        component: OrganisationListComponent,
      }, {
        path: 'view/:id',
        component: OrganisationViewComponent
      }
    ]
  }, {
    path: 'blog',
    component: BlogListComponent,
    },
  // {
  //   path: '',
  //   component: AboutComponent,
  // },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([{
    path: '',
    children: PublicRoutes,
    resolve: PublicResolvers,
    component: LayoutComponent
  }])],
  providers: PublicProviders
})

export class PublicRouter { }
