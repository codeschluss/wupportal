import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { AboutComponent } from './layout/about.component';
import { ActivityListComponent } from './activity/activity.list.component';

const PublicProviders = [
];

const PublicResolvers = {
};

const PublicRoutes = [
  {
    path: 'home',
    // resolve: PublicResolvers,
    component: AboutComponent,
    children: []
  },
  {
    path: 'list',
    // resolve: PublicResolvers,
    component: ActivityListComponent,
    children: []
  },
  {
    path: '',
    // resolve: PublicResolvers,
    component: PublicComponent,
    children: []
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(PublicRoutes)],
  providers: PublicProviders
})

export class PublicRouter { }
