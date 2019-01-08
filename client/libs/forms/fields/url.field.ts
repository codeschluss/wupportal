import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    input:first-child { display: none; }
    mat-select { width: 75px; }
  `],
  template: BaseFieldComponent.template(`
    <input matInput [formControlName]="field.name">
    <input #input matInput type="url" [id]="field.name">
    <mat-select matPrefix [formControl]="select">
      <mat-option value="http://">http://</mat-option>
      <mat-option value="https://">https://</mat-option>
    </mat-select>
  `)
})

export class UrlFieldComponent extends BaseFieldComponent
  implements AfterViewInit {

  @ViewChild('input', { read: MatInput })
  public input: MatInput;

  public select: FormControl = new FormControl('http://');

  public ngAfterViewInit(): void {
    combineLatest(
      this.select.valueChanges.pipe(startWith(this.select.value)),
      this.input.stateChanges.pipe(map(() => this.input.value))
    ).subscribe((change) => this.value = change[1] ? change.join('') : null);
  }

}
