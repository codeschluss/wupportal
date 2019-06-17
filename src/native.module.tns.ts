import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import { fas as freeicons } from '@fortawesome/free-solid-svg-icons';
import { CoreModule } from '@wooportal/core';
import { NativeScriptAnimationsModule } from 'nativescript-angular/animations';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { BaseModule } from './base/base.module';
import { NativeComponent } from './native.component.tns';
import { NativeRouter } from './native.router.tns';
import { Hostname } from './utils/hostname';
import { SharedModule } from './views/shared/shared.module';

fontawesome.add(freeicons);

@NgModule({
  bootstrap: [NativeComponent],
  declarations: [NativeComponent],
  imports: [
    BaseModule,
    CoreModule,
    NativeRouter,
    NativeScriptAnimationsModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Hostname, multi: true }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class NativeModule { }
