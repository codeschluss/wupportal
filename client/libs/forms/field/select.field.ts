import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  template: BaseFieldComponent.template(`
    <mat-select [formControl]="select" [multiple]="field.multi">
      <ng-container *ngFor="let item of field.options">
        <mat-option [value]="item.id">
          {{ toLabel(item) }}
        </mat-option>
      </ng-container>
    </mat-select>
  `)
})

export class SelectFieldComponent extends BaseFieldComponent {

  public select: FormControl = new FormControl();

  protected ngPostInit(): void {
    if (this.value) { this.select.setValue(this.toId(this.value)); }
    this.select.valueChanges
      .pipe(map((change) => this.toModel(change)))
      .subscribe((change) => this.value = change);
  }

}
