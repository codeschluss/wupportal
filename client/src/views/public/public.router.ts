import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([{
    path: '',
    component: PublicComponent
  }])]
})

export class PublicRouter { }
