import { NgModule } from '@angular/core';
import { PreloadAllModules, Route } from '@angular/router';
import { LabelsResolver, LoadingGuarding, SessionResolver } from '@wooportal/core';
import { NativeScriptRouterModule as AppRouterModule } from 'nativescript-angular/router';
import { ErrorNetsplitComponent } from './views/error/netsplit/error.netsplit';
import { SharedComponent } from './views/shared/shared.component';

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
  exports: [AppRouterModule],
  imports: [AppRouterModule.forRoot([
    {
      path: 'netsplit',
      canDeactivate: [LoadingGuarding],
      component: ErrorNetsplitComponent
    },
    {
      path: '',
      children: routes,
      component: SharedComponent,
      canActivate: [LoadingGuarding],
      resolve: {
        session: SessionResolver,
        xliff: LabelsResolver
      }
    }
  ], {
    preloadingStrategy: PreloadAllModules
  })]
})

export class NativeRouter { }
