import { NgModule } from '@angular/core';
import { RouterCompat } from '../shared/compat/router/router.compat';
import { PublicComponent } from './public.component';

@NgModule({
  exports: [RouterCompat],
  imports: [RouterCompat.forChild([{
    path: '',
    component: PublicComponent
  }])]
})

export class PublicRouter { }
