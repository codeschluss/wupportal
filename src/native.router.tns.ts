import { NgModule } from '@angular/core';
import { PreloadAllModules, Route } from '@angular/router';
import { I18nResolver, PlatformGuarding, SessionResolver } from '@wooportal/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ErrorNetsplitComponent } from './error/netsplit/error.netsplit';
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
      path: 'netsplit',
      canDeactivate: [PlatformGuarding],
      component: ErrorNetsplitComponent
    },
    {
      path: '',
      children: routes,
      component: LayoutComponent,
      canActivate: [PlatformGuarding],
      resolve: {
        session: SessionResolver,
        xliff: I18nResolver
      }
    }
  ], {
    preloadingStrategy: PreloadAllModules
  })]
})

export class NativeRouter { }
