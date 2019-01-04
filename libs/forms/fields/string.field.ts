import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: BaseFieldComponent.template(`
    <ng-template #txt>
      <textarea matInput matTextareaAutosize
        [formControlName]="field.name"
        [id]="field.name">
      </textarea>
    </ng-template>
    <ng-template #str>
      <input matInput
        [formControlName]="field.name"
        [id]="field.name"
        [type]="field.type">
    </ng-template>
    <ng-container *ngIf="field.multi; then txt; else str"></ng-container>
  `)
})

export class StringFieldComponent extends BaseFieldComponent { }
