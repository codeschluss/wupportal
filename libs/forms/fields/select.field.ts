import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { map } from 'rxjs/operators';
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
    if (this.value) { this.select.setValue(this.toId(this.value)); }

    this.select.valueChanges
      .pipe(map((change) => this.toModel(change)))
      .subscribe((change) => this.value = change);
  }

}
