import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: BaseFieldComponent.template(`
    <textarea matInput
      [formControlName]="field.name"
      [id]="field.name"
      [matTextareaAutosize]="true">
    </textarea>
  `)
})

export class TextareaFieldComponent
  extends BaseFieldComponent { }
