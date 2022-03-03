import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { BlogSubmitComponent } from './blog-submit.component';

const routes: Route[] = [
  BlogSubmitComponent.routing
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

export class BlogSubmitRouter { }
