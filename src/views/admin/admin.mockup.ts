import { Component, NgModule } from '@angular/core';
import { AppRouterModule } from '@wooportal/app';
import { AdminGuarding } from './admin.guarding';

@Component({
  template: ``
})

export class AdminComponent { }

@NgModule({
  exports: [AppRouterModule],
  imports: [AppRouterModule.forChild([
    {
      path: '**',
      pathMatch: 'full',
      component: AdminComponent,
      canActivate: [AdminGuarding]
    }
  ])]
})

export class AdminRouter { }

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    AdminRouter
  ]
})

export class AdminModule { }
