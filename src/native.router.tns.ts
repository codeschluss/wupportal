import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { I18nResolver, SessionResolver } from '@wooportal/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LayoutComponent } from './views/shared/layout/layout.component';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'mapview',
        loadChildren: () => import('./views/maps/maps.module')
          .then((imported) => imported.MapsModule)
      },
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
        session: SessionResolver,
        xliff: I18nResolver
      }
    }
  ])]
})

export class NativeRouter { }
