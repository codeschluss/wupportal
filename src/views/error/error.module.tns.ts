import { NgModule, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { AppCommonModule } from '@wooportal/app';
import { NgRippleModule } from 'nativescript-ng-ripple';
import { SharedModule } from '../shared/shared.module';
import { ErrorNetsplitComponent } from './netsplit/error.netsplit';
import { FatalPopupComponent } from './popups/fatal/fatal.popup';
import { MinorPopupComponent } from './popups/minor/minor.popup';
import { ErrorResponseComponent } from './response/error.response';

const components: Type<any>[] = [
  ErrorNetsplitComponent,
  ErrorResponseComponent
];

const materials: Type<any>[] = [
  NgRippleModule
];

const popups: Type<any>[] = [
  FatalPopupComponent,
  MinorPopupComponent
];

@NgModule({
  declarations: [
    ...components,
    ...popups
  ],
  entryComponents: [
    ...popups
  ],
  imports: [
    ...materials,
    AppCommonModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class ErrorModule { }
