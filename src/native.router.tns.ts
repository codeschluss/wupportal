import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

@NgModule({
  exports: [NativeScriptRouterModule],
  imports: [NativeScriptRouterModule.forRoot([
    {
      path: '',
      loadChildren: () => import('./views/public/public.module')
        .then((imported) => imported.PublicModule)
    },
    {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }
  ])]
})

export class NativeRouter { }
