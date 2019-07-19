import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { I18nResolver, SessionResolver } from '@wooportal/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LayoutComponent } from './views/shared/layout/layout.component';

const routes: Route[] = [
  {
    path: '',
    resolve: {
      session: SessionResolver,
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/public/public.module')
          .then((imported) => imported.PublicModule)
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  exports: [NativeScriptRouterModule],
  imports: [NativeScriptRouterModule.forRoot([
    {
      path: '',
      children: routes,
      component: LayoutComponent,
      resolve: {
        xliff: I18nResolver
      }
    }
  ])]
})

export class NativeRouter { }
