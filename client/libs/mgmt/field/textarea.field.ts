import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: BaseFieldComponent.template(`
    <textarea matInput matTextareaAutosize [formControlName]="field.name">
    </textarea>
  `)
})

export class TextareaFieldComponent extends BaseFieldComponent { }
