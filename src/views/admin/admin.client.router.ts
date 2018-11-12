import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminClientComponent } from './admin.client.component';

const AdminClientProviders = [
];

const AdminClientResolvers = {
};

const AdminClientRoutes = [
  {
    path: '',
    component: AdminClientComponent,
    resolvers: AdminClientResolvers,
    children: []
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(AdminClientRoutes)],
  providers: AdminClientProviders
})

export class AdminClientRouter { }
