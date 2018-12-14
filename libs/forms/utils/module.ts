import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { CoreModule } from '@portal/core';
import { BaseFieldComponent } from '../base/base.field';
import { BooleanFieldComponent } from '../field/boolean.field';
import { ChipListFieldComponent } from '../field/chip-list.field';
import { DatetimeFieldComponent } from '../field/datetime.field';
import { SelectFieldComponent } from '../field/select.field';
import { StringFieldComponent } from '../field/string.field';

const ModuleLoop = [
  MatAutocompleteModule,
  MatButtonModule,
  MatChipsModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,

  MatTableModule,
  MatPaginatorModule,
  MatSortModule,

  ReactiveFormsModule
];

const Components = [
  BaseFieldComponent,
  BooleanFieldComponent,
  ChipListFieldComponent,
  DatetimeFieldComponent,
  SelectFieldComponent,
  StringFieldComponent
];

@NgModule({
  declarations: Components,
  entryComponents: [Components],
  exports: [
    BaseFieldComponent,
    ...ModuleLoop
  ],
  imports: [
    CommonModule,
    CoreModule,
    ...ModuleLoop
  ]
})

export class FormsModule { }
