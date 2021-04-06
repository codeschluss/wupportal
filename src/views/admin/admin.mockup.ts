import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminGuarding } from './admin.guarding';

@Component({
  template: ``
})

export class AdminComponent { }

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
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
