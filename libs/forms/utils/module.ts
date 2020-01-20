import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule as StaticFormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CoreModule } from '@wooportal/core';
import { BaseFieldComponent } from '../base/base.field';
import { BooleanFieldComponent } from '../fields/boolean.field';
import { ChipListFieldComponent } from '../fields/chip-list.field';
import { EditorFieldComponent } from '../fields/editor.field';
import { SelectFieldComponent } from '../fields/select.field';
import { StringFieldComponent } from '../fields/string.field';
import { UrlFieldComponent } from '../fields/url.field';
import { FileValueAccessorDirective } from './accesor';

const declarations: Type<any>[] = [
  BaseFieldComponent,
  FileValueAccessorDirective
];

const fields: Type<BaseFieldComponent>[] = [
  BooleanFieldComponent,
  ChipListFieldComponent,
  EditorFieldComponent,
  SelectFieldComponent,
  StringFieldComponent,
  UrlFieldComponent
];

const materials: Type<any>[] = [
  CKEditorModule,
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
  MatTabsModule,
  ReactiveFormsModule,
  StaticFormsModule
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
    ...materials
  ],
  imports: [
    ...materials,
    CommonModule,
    CoreModule,
    RouterModule
  ]
})

export class FormsModule { }
