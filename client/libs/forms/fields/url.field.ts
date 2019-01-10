import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    input:first-child { display: none; }
    mat-select { width: 75px; }
  `],
  template: BaseFieldComponent.template(`
    <input matInput [formControlName]="field.name">
    <input matInput [formControl]="input" type="url" [id]="field.name">
    <mat-select matPrefix [formControl]="select">
      <mat-option value="http://">http://</mat-option>
      <mat-option value="https://">https://</mat-option>
    </mat-select>
  `)
})

export class UrlFieldComponent extends BaseFieldComponent
  implements AfterViewInit {

  public input: FormControl = new FormControl();

  public select: FormControl = new FormControl();

  public ngAfterViewInit(): void {
    const value = this.value || '';
    const protocol = value.startsWith('http://') ? 'http://' : 'https://';

    this.input.patchValue(value.split(protocol).pop());
    this.select.patchValue(protocol);

    combineLatest(
      this.select.valueChanges.pipe(startWith(protocol)),
      this.input.valueChanges
    ).subscribe((change) => this.value = change.join(''));
  }

}
