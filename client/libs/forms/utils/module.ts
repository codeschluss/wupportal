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

const materials: Type<any>[] = [
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
    ...declarations,
    ...fields
  ],
  entryComponents: [
    ...fields
  ],
  exports: [
    ...declarations,
    ...materials,
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
