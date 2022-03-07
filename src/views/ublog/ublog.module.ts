import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LabelModule } from 'src/core';
import { UblogComponent } from './ublog.component';
import { UblogRouter } from './ublog.router';

const components: Type<any>[] = [
  UblogComponent
];

const materials: Type<any>[] = [
  CKEditorModule,
  FontAwesomeModule,
  LabelModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ],
  imports: [
    ...materials,
    CommonModule,
    UblogRouter
  ]
})

export class UblogModule { }
