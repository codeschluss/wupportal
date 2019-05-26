import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

@NgModule({
  exports: [NativeScriptRouterModule],
  imports: [NativeScriptRouterModule.forRoot([
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    }
  ])]
})

export class NativeRouter { }
