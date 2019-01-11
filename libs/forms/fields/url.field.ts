import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    input:first-child { display: none; }
  `],
  template: BaseFieldComponent.template(`
    <input [id]="field.name">
    <input matInput [formControl]="input" [name]="field.name">
    <span matPrefix>{{ transport }}</span>
    <mat-slide-toggle matSuffix [formControl]="toggle">
      <i18n i18n="@@encryptedConnection">encryptedConnection</i18n>
    </mat-slide-toggle>
  `)
})

export class UrlFieldComponent extends BaseFieldComponent
  implements AfterViewInit {

  public input: FormControl = new FormControl();

  public toggle: FormControl = new FormControl();

  public transport: string;

  public ngAfterViewInit(): void {
    this.control.statusChanges.subscribe(() =>
      this.input.setErrors(this.control.errors));

    this.input.valueChanges.subscribe((value) =>
      this.value = value ? this.transport + value : null);

    this.toggle.valueChanges.subscribe((value) => {
      this.transport = value ? 'https://' : 'http://';
      this.input.patchValue(this.input.value);
    });
  }

  protected ngPostInit(): void {
    this.control.valueChanges
      .pipe(startWith(this.control.value))
      .subscribe((value) => this.update(value || ''));
  }

  private update(value: string): void {
    this.input.patchValue(value.split('://').pop(), { emitEvent: false });
    this.toggle.patchValue(value.startsWith('https://'), { emitEvent: false });
    this.transport = this.toggle.value ? 'https://' : 'http://';
  }

}
