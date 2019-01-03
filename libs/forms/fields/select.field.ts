import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: ['input { display: none; }'],
  template: BaseFieldComponent.template(`
    <input [id]="field.name">
    <mat-select [formControl]="select" [multiple]="multi" [required]="require">
      <ng-container *ngFor="let item of field.options">
        <mat-option [value]="item.id">{{ toLabel(item) }}</mat-option>
      </ng-container>
    </mat-select>
  `)
})

export class SelectFieldComponent extends BaseFieldComponent
  implements AfterViewInit {

  @ViewChild(MatSelect)
  public input: MatSelect;

  public select: FormControl = new FormControl();

  public get multi(): boolean {
    return this.field.multi;
  }

  public get require(): boolean {
    return this.field.tests && this.field.tests.includes(Validators.required);
  }

  public ngAfterViewInit(): void {
    this.input.required = this.field.tests
      && this.field.tests.includes(Validators.required);
  }

  protected ngPostInit(): void {
    if (this.value) { this.select.patchValue(this.toId(this.value)); }

    this.group.get(this.field.name).valueChanges.subscribe((change) => {
      this.select.patchValue(this.toId(change), { emitEvent: false });
      this.group.get(this.field.name).markAsDirty();
    });

    this.select.valueChanges.subscribe(
      (change) => this.value = this.toModel(change));
  }

}
