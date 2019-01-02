import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { CoreModule } from '@portal/core';
import { BaseFieldComponent } from '../base/base.field';
import { BooleanFieldComponent } from '../fields/boolean.field';
import { ChipListFieldComponent } from '../fields/chip-list.field';
import { SelectFieldComponent } from '../fields/select.field';
import { StringFieldComponent } from '../fields/string.field';
import { UploadFieldComponent } from '../fields/upload.field';
import { FileValueAccessorDirective } from './accesor';

const declarations: Type<any>[] = [
  BaseFieldComponent,
  FileValueAccessorDirective
];

const fields: Type<BaseFieldComponent>[] = [
  BooleanFieldComponent,
  ChipListFieldComponent,
  UploadFieldComponent,
  SelectFieldComponent,
  StringFieldComponent
];

const modloop: Type<any>[] = [
  MatAutocompleteModule,
  MatButtonModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
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
  entryComponents: [...fields],
  exports: [...modloop, BaseFieldComponent],
  imports: [...modloop, CommonModule, CoreModule]
})

export class FormsModule { }
