import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: BaseFieldComponent.template(`
    <input matInput [formControlName]="field.name" [matDatepicker]="picker">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  `)
})

export class DatetimeFieldComponent extends BaseFieldComponent { }
