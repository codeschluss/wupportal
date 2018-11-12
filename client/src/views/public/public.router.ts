import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';

const PublicProviders = [
];

const PublicResolvers = {
};

const PublicRoutes = [
  {
    path: '',
    component: PublicComponent,
    resolve: PublicResolvers,
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
