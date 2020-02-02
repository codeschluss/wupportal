import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppCommonModule } from '@wooportal/app';
import { SharedModule } from '../shared/shared.module';
import { ErrorRouter } from './error.router';
import { ErrorNetsplitComponent } from './netsplit/error.netsplit';
import { FatalPopupComponent } from './popups/fatal/fatal.popup';
import { MinorPopupComponent } from './popups/minor/minor.popup';
import { ErrorResponseComponent } from './response/error.response';

const components: Type<any>[] = [
  ErrorNetsplitComponent,
  ErrorResponseComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule,
  MatToolbarModule
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
    ErrorRouter,
    SharedModule
  ]
})

export class ErrorModule { }
