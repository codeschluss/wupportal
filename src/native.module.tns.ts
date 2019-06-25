import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { NativeScriptAnimationsModule } from 'nativescript-angular/animations';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { BaseModule } from './base/base.module';
import { ErrorModule } from './error/error.module';
import { NativeComponent } from './native.component.tns';
import { NativeRouter } from './native.router.tns';

fontawesome.add(freeicons);

@NgModule({
  bootstrap: [NativeComponent],
  declarations: [NativeComponent],
  imports: [
    BaseModule,
    ErrorModule,
    NativeRouter,
    NativeScriptAnimationsModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class NativeModule { }
