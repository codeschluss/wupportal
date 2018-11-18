import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { AboutComponent } from './layout/about.component';
import { ActivityListComponent } from './activity/activity.list.component';
import { ActivityViewComponent } from './activity/activity.view.component';
import { LayoutComponent } from '../layout/layout.component';
import { OrganisationListComponent } from './organisation/organisation.list.component';

const PublicProviders = [
];

const PublicResolvers = {
};

const PublicRoutes = [
  {
    path: 'home',
    // resolve: PublicResolvers,
    component: AboutComponent,
  },

  {
    path: 'activities',
    // resolve: PublicResolvers,
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
  },

  {
  path: 'organisations',
  // resolve: PublicResolvers,
  children: [
      {
        path: 'list', 
        component: OrganisationListComponent,
      }
    ]
  },
  {
    path: '',
    // resolve: PublicResolvers,
    component: AboutComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([{
    path: '',
    children: PublicRoutes,
    component: LayoutComponent,
    resolve: PublicResolvers,
  }])], 
  providers: PublicProviders
})

export class PublicRouter { }
