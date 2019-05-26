import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeComponent } from './native.component.tns';
import { NativeRouter } from './native.router.tns';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
  declarations: [
    NativeComponent
  ],
  imports: [
    NativeRouter,
    NativeScriptHttpClientModule,
    NativeScriptModule,
  ],
  providers: [],
  bootstrap: [NativeComponent],
  schemas: [NO_ERRORS_SCHEMA]
})

export class NativeModule { }
