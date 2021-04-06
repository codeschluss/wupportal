import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: `
    <span [formGroup]="group">
      <mat-slide-toggle [formControlName]="field.name" [id]="field.name">
      </mat-slide-toggle>
    </span>
  `
})

export class BooleanFieldComponent
  extends BaseFieldComponent { }
