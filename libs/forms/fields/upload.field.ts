import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: ['input[type=file] { display: none; }'],
  template: BaseFieldComponent.template(`
    <input #input type="file" [formControlName]="field.name" [id]="field.name">
    <input matInput readonly [value]="value" (click)="input.click()">
  `)
})

export class UploadFieldComponent extends BaseFieldComponent {

  public get value(): any {
    const value = this.group.get(this.field.name).value;
    return value ? value[0].name : '';
  }

}
