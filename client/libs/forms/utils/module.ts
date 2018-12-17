import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { CoreModule } from '@portal/core';
import { BaseFieldComponent } from '../base/base.field';
import { BooleanFieldComponent } from '../field/boolean.field';
import { ChipListFieldComponent } from '../field/chip-list.field';
import { DatetimeFieldComponent } from '../field/datetime.field';
import { SelectFieldComponent } from '../field/select.field';
import { StringFieldComponent } from '../field/string.field';
import { UploadFieldComponent } from '../field/upload.field';
import { FileValueAccessorDirective } from './accesor';
import { ConfirmDialogComponent } from './confirm';

const declarations: Type<any>[] = [
  BaseFieldComponent,
  ConfirmDialogComponent,
  FileValueAccessorDirective
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
  declarations: [...fields, ...declarations],
  entryComponents: [...fields, ConfirmDialogComponent],
  exports: [...modloop, BaseFieldComponent],
  imports: [...modloop, CommonModule, CoreModule]
})

export class FormsModule { }
