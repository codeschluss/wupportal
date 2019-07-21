import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { CoreModule, PlatformCommonModule } from '@wooportal/core';
import { NgRippleModule } from 'nativescript-ng-ripple';
import { ErrorBarComponent } from './bar/error.bar';
import { ErrorDialogComponent } from './dialog/error.dialog';
import { ErrorResponseComponent } from './response/error.response';

const components: Type<any>[] = [
  ErrorResponseComponent
];

const dialogs: Type<any>[] = [
  ErrorBarComponent,
  ErrorDialogComponent
];

const materials: Type<any>[] = [
  NgRippleModule
];

@NgModule({
  declarations: [
    ...components,
    ...dialogs
  ],
  entryComponents: [
    ...dialogs
  ],
  imports: [
    ...materials,
    CoreModule,
    PlatformCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class ErrorModule { }
