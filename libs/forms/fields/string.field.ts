import { Component } from '@angular/core';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: BaseFieldComponent.template(`
    <ng-container *ngIf="field.multi; then txt; else str"></ng-container>

    <ng-template #txt>
      <textarea matInput matTextareaAutosize
        [formControlName]="field.name"
        [id]="field.name"
        [matAutosizeMinRows]="2">
      </textarea>
    </ng-template>
    <ng-template #str>
      <input matInput
        [formControlName]="field.name"
        [id]="field.name"
        [type]="field.type">
    </ng-template>
  `)
})

export class StringFieldComponent extends BaseFieldComponent { }
