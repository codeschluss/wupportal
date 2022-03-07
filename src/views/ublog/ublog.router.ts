import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UblogComponent } from './ublog.component';

const routes: Route[] = [
  UblogComponent.routing
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([
    {
      path: '',
      children: routes
    }
  ])]
})

export class UblogRouter { }
