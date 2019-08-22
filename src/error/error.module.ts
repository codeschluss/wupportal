import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule, PlatformCommonModule } from '@wooportal/core';
import { ErrorBarComponent } from './bar/error.bar';
import { ErrorDialogComponent } from './dialog/error.dialog';
import { ErrorRouter } from './error.router';
import { ErrorResponseComponent } from './response/error.response';

const components: Type<any>[] = [
  ErrorResponseComponent
];

const dialogs: Type<any>[] = [
  ErrorBarComponent,
  ErrorDialogComponent
];

const materials: Type<any>[] = [
  FontAwesomeModule,
  MatButtonModule,
  MatDialogModule,
  MatSnackBarModule
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
    ErrorRouter,
    PlatformCommonModule
  ]
})

export class ErrorModule { }
