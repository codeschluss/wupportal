import { NgModule, Type } from '@angular/core';
import { Resolve, Route } from '@angular/router';
import { I18nResolver, SessionResolver } from '@wooportal/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LayoutComponent } from './views/shared/layout/layout.component';

const resolvers: { [key: string]: Type<Resolve<any>> } = {
  session: SessionResolver,
  xliff: I18nResolver
};

const routes: Route[] = [
  {
    path: '',
    // resolve: resolvers,
    children: [
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
    ]
  }
];

@NgModule({
  exports: [NativeScriptRouterModule],
  imports: [NativeScriptRouterModule.forRoot([
    {
      path: '',
      children: routes,
      component: LayoutComponent,
      // resolve: resolvers,
    }
  ])]
})

export class NativeRouter { }
