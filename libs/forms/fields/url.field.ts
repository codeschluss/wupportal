import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, startWith } from 'rxjs/operators';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    input:first-child { display: none; }
  `],
  template: BaseFieldComponent.template(`
    <input [id]="field.name">
    <input matInput [formControl]="input" [name]="field.name">
    <span matPrefix>{{ transport }}</span>
    <mat-slide-toggle matSuffix [formControl]="proto">
      <i18n i18n="@@encryptedConnection">encryptedConnection</i18n>
    </mat-slide-toggle>
  `)
})

export class UrlFieldComponent extends BaseFieldComponent
  implements AfterViewInit {

  public input: FormControl = new FormControl();

  public proto: FormControl = new FormControl();

  public transport: string;

  public ngAfterViewInit(): void {
    this.control.statusChanges.subscribe(() =>
      this.input.setErrors(this.control.errors));

    this.input.valueChanges.subscribe((value) =>
      this.value = value ? this.transport + value.split('://').pop() : null);

    this.proto.valueChanges.subscribe((value) => {
      this.transport = value ? 'https://' : 'http://';
      this.input.patchValue(this.input.value);
    });
  }

  protected ngPostInit(): void {
    this.control.valueChanges.pipe(
      startWith(this.control.value),
      filter((value) => typeof value === 'string')
    ).subscribe((value) => {
      this.input.patchValue(value.split('://').pop(), { emitEvent: false });
      this.proto.patchValue(value.startsWith('https://'), { emitEvent: false });
      this.proto[value ? 'enable' : 'disable']({ emitEvent: false });
      this.transport = this.proto.value ? 'https://' : 'http://';
    });
  }

}
