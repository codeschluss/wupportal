import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    input { display: none; }
  `],
  template: BaseFieldComponent.template(`
    <input [id]="field.name">
    <mat-select [formControl]="select" [multiple]="multi" [required]="require">
      <ng-container *ngFor="let item of field.options">
        <mat-option [value]="item.id">{{ toLabel(item) }}</mat-option>
      </ng-container>
    </mat-select>
  `)
})

export class SelectFieldComponent
  extends BaseFieldComponent
  implements AfterViewInit {

  public select: FormControl = new FormControl();

  @ViewChild(MatSelect, { static: true })
  private selection: MatSelect;

  public get multi(): boolean {
    return this.field.multi;
  }

  public get require(): boolean {
    return this.field.tests && this.field.tests.includes(Validators.required);
  }

  public ngAfterViewInit(): void {
    const field = this.field.name;
    if (this.value) { this.select.patchValue(this.toId(this.value)); }
    if (this.group.get(field).status === 'DISABLED') { this.select.disable(); }

    this.group.get(field).statusChanges.subscribe((s) => s === 'DISABLED'
      ? this.select.enabled && this.select.disable({ emitEvent: false })
      : this.select.disabled && this.select.enable({ emitEvent: false }));

    this.group.get(field).valueChanges.subscribe((value) => {
      this.select.patchValue(this.toId(value), { emitEvent: false });
      this.group.get(field).markAsDirty();
    });

    this.select.valueChanges.subscribe((v) => this.value = this.toModel(v));

    this.selection.required = this.field.tests
      && this.field.tests.includes(Validators.required);
  }

}
