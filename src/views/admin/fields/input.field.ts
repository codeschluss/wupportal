import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: BaseFieldComponent.template(`
    <input matInput
      [formControlName]="field.name"
      [id]="field.name"
      [type]="field.type">
  `)
})

export class InputFieldComponent
  extends BaseFieldComponent { }
