import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { BaseFieldComponent } from '../base/base.field';
import { BooleanFieldComponent } from '../field/boolean.field';
import { ChipListFieldComponent } from '../field/chip-list.field';
import { DatetimeFieldComponent } from '../field/datetime.field';
import { SelectFieldComponent } from '../field/select.field';
import { StringFieldComponent } from '../field/string.field';
import { TextareaFieldComponent } from '../field/textarea.field';

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
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    BaseFieldComponent,
    BooleanFieldComponent,
    ChipListFieldComponent,
    DatetimeFieldComponent,
    SelectFieldComponent,
    StringFieldComponent,
    TextareaFieldComponent
  ],
  exports: [
    BaseFieldComponent,
    ...ModuleLoop
  ],
  imports: [
    CommonModule,
    ...ModuleLoop
  ]
})

export class ManagementModule { }
