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
import { resolve } from 'dns';
import { CrudResolver } from 'src/core/crud/crud.resolver';
import { CrudJoiner } from 'src/core/crud/crud.joiner';
import { ActivityModel } from 'src/core/models/activity.model';
import { AddressModel } from 'src/core/models/address.model';
import { SuburbModel } from 'src/core/models/suburb.model';

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
  },
  {
    path: 'blog',
    component: BlogListComponent,
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
