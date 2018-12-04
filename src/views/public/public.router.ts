import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './layout/about.component';
import { ActivityListComponent } from './activity/activity.list.component';
import { ActivityViewComponent } from './activity/activity.view.component';
import { LayoutComponent } from '../layout/layout.component';
import { OrganisationListComponent } from './organisation/organisation.list.component';
import { OrganisationViewComponent } from './organisation/organisation.view.component';
import { BlogListComponent } from './blog/blog.list.component';
import { SearchResultListComponent } from './search/searchresult.list.component';
import { BlogViewComponent } from './blog/blog.view.component';

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
        path: '',
        component: ActivityListComponent,
      }
    ]
  },
  {
    path: 'list/activities',
    children: [
      {
        path: '/',
        component: ActivityListComponent
      },
      {
        path: '',
        component: ActivityListComponent
      }
    ]
  },
  {
    path: 'view/activities/:id',
    component: ActivityViewComponent
  },
  {
  path: 'organisations',
  children: [
      {
        path: '',
        component: OrganisationListComponent,
      }
    ]
  },
  {
    path: 'list/organisations',
    children: [
      {
        path: '/',
        component: OrganisationListComponent,
      },
      {
        path: '',
        component: OrganisationListComponent,
      }
    ]
  },
  {
    path: 'view/organisations/:id',
    component: OrganisationViewComponent
  },
  {
    path: 'list/blogs',
    children: [
      {
        path: '/',
        component: BlogListComponent,
      },
      {
        path: '',
        component: BlogListComponent,
      }
    ]
  },
  {
    path: 'view/blogs/:id',
    component: BlogViewComponent
  },
  {
    path: 'search',
    children: [
      {
        path: ':query',
        component: SearchResultListComponent,
      },
      {
        path: '',
        component: SearchResultListComponent
      }
    ]
  },
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
