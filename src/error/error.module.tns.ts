import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { PlatformCommonModule } from '@wooportal/core';
import { NgRippleModule } from 'nativescript-ng-ripple';
import { BaseModule } from '../base/base.module';
import { ErrorBarComponent } from './bar/error.bar';
import { ErrorDialogComponent } from './dialog/error.dialog';
import { ClientErrorHandler } from './handler/error.handler';

const dialogs: Type<any>[] = [
  ErrorBarComponent,
  ErrorDialogComponent
];

const materials: Type<any>[] = [
  NgRippleModule
];

@NgModule({
  declarations: [
    ...dialogs
  ],
  entryComponents: [
    ...dialogs
  ],
  imports: [
    ...materials,
    BaseModule,
    PlatformCommonModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ClientErrorHandler }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class ErrorModule { }
