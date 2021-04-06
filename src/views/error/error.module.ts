import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabelModule } from '../../core';
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
  LabelModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  ReactiveFormsModule
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
    CommonModule,
    ErrorRouter
  ]
})

export class ErrorModule { }
