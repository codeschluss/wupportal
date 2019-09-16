import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRouter } from './public.router';

@NgModule({
  declarations: [PublicComponent],
  imports: [PublicRouter]
})

export class PublicModule { }
