import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicClientComponent } from './public.client.component';

const PublicClientProviders = [
];

const PublicClientResolvers = {
};

const PublicClientRoutes = [
  {
    path: '',
    component: PublicClientComponent,
    resolvers: PublicClientResolvers,
    children: []
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(PublicClientRoutes)],
  providers: PublicClientProviders
})

export class PublicClientRouter { }
