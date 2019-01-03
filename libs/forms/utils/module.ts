import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@portal/core';
import { BaseFieldComponent } from '../base/base.field';
import { BooleanFieldComponent } from '../fields/boolean.field';
import { ChipListFieldComponent } from '../fields/chip-list.field';
import { SelectFieldComponent } from '../fields/select.field';
import { StringFieldComponent } from '../fields/string.field';
import { UploadFieldComponent } from '../fields/upload.field';
import { FileValueAccessorDirective } from './accesor';

export const declarations: Type<any>[] = [
  BaseFieldComponent,
  FileValueAccessorDirective
];

export const fields: Type<BaseFieldComponent>[] = [
  BooleanFieldComponent,
  ChipListFieldComponent,
  UploadFieldComponent,
  SelectFieldComponent,
  StringFieldComponent
];

export const materials: Type<any>[] = [
  MatAutocompleteModule,
  MatButtonModule,
  MatChipsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
];

@NgModule({
  declarations: [
    ...fields,
    ...declarations
  ],
  entryComponents: [
    ...fields
  ],
  exports: [
    ...materials,
    BaseFieldComponent,
    ReactiveFormsModule
  ],
  imports: [
    ...materials,
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    RouterModule
  ]
})

export class FormsModule { }
