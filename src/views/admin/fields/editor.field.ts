import { AfterViewInit, Component, OnDestroy, Type, ViewChild } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { CKEditor5, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { InlineEditor } from '@wooportal/editor';
import { merge, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    :host ::ng-deep .ck-content {
      border: 0 !important;
      box-shadow: none !important;
      overflow: hidden !important;
      padding: 0 !important;
    }
    :host ::ng-deep .ck-content.ck-read-only {
      color: rgba(0, 0, 0, .38);
    }
    :host ::ng-deep .ck-content > :first-child {
      margin-top: .4375em;
    }
    :host ::ng-deep .ck-content > :last-child {
      margin-bottom: 0;
    }
  `],
  template: BaseFieldComponent.template(`
    <ckeditor #instance
      [disabled]="disabled"
      [editor]="editor"
      [id]="field.name"
      [ngModelOptions]="{ standalone: true }"
      (change)="changes.next()"
      [(ngModel)]="content">
    </ckeditor>
  `)
})

export class EditorFieldComponent extends BaseFieldComponent
  implements AfterViewInit, OnDestroy, MatFormFieldControl<string> {

  public controlType: string = 'ckeditor';

  public changes: Subject<any> = new Subject<any>();

  public editor: Type<CKEditor5.Editor> = InlineEditor;

  public focused: boolean;

  public id: string;

  public ngControl: NgControl = null;

  public placeholder: string;

  @ViewChild('instance', { static: true })
  private instance: CKEditorComponent;

  @ViewChild(MatFormField, { static: true })
  private parent: MatFormField;

  public get content(): string {
    return this.value || '';
  }

  public set content(value: string) {
    this.value = value;
  }

  public get disabled(): boolean {
    return this.control.disabled;
  }

  public get empty(): boolean {
    return !this.value;
  }

  public get errorState(): boolean {
    return this.control.touched && this.required && !this.value;
  }

  public get required(): boolean {
    return this.field.tests && this.field.tests.includes(Validators.required);
  }

  public get shouldLabelFloat(): boolean {
    return this.focused || !!this.value;
  }

  public get stateChanges(): Observable<any> {
    return this.changes.asObservable();
  }

  public ngAfterViewInit(): void {
    this.id = this.field.name;

    merge(
      this.instance.blur.pipe(map(() => false)),
      this.instance.focus.pipe(map(() => true)),
    ).pipe(
      tap((focused) => focused || this.control.markAsTouched())
    ).subscribe((focused) => this.changes.next(this.focused = focused));
  }

  public ngOnDestroy(): void {
    this.changes.complete();
  }

  public onContainerClick(_: Event): void { }

  public setDescribedByIds(_: string[]): void { }

  protected ngPostInit(): void {
    this.parent._control = this;
  }

}
