import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { CoreModule } from '@portal/core';
import { BaseFieldComponent } from '../base/base.field';
import { ConfirmDialogComponent } from '../dialogs/confirm.dialog';
import { SelectDialogComponent } from '../dialogs/select.dialog';
import { BooleanFieldComponent } from '../fields/boolean.field';
import { ChipListFieldComponent } from '../fields/chip-list.field';
import { DatetimeFieldComponent } from '../fields/datetime.field';
import { SelectFieldComponent } from '../fields/select.field';
import { StringFieldComponent } from '../fields/string.field';
import { UploadFieldComponent } from '../fields/upload.field';
import { FileValueAccessorDirective } from './accesor';

const declarations: Type<any>[] = [
  BaseFieldComponent,
  FileValueAccessorDirective
];

const entryComponents: Type<any>[] = [
  ConfirmDialogComponent,
  SelectDialogComponent
];

const fields: Type<BaseFieldComponent>[] = [
  BooleanFieldComponent,
  ChipListFieldComponent,
  DatetimeFieldComponent,
  UploadFieldComponent,
  SelectFieldComponent,
  StringFieldComponent
];

const modloop: Type<any>[] = [
  MatAutocompleteModule,
  MatButtonModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [...fields, ...declarations, ...entryComponents],
  entryComponents: [...fields, ...entryComponents],
  exports: [...modloop, BaseFieldComponent],
  imports: [...modloop, CommonModule, CoreModule]
})

export class FormsModule { }
