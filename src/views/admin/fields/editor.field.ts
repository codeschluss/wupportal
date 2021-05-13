import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { CKEditor5, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
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
    <ckeditor
      [config]="config"
      [disabled]="disabled"
      [editor]="editor"
      [id]="field.name"
      [ngModelOptions]="{ standalone: true }"
      (change)="changes.next()"
      [(ngModel)]="content">
    </ckeditor>
  `)
})

export class EditorFieldComponent
  extends BaseFieldComponent
  implements OnInit, AfterViewInit, OnDestroy, MatFormFieldControl<string> {

  public changes: Subject<any> = new Subject<any>();

  public config: CKEditor5.Config = {
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    toolbar: {
      items: [
        'heading',
        'alignment',
        'fontSize',
        '|',
        'bold',
        'italic',
        'underline',
        'code',
        '|',
        'strikethrough',
        'subscript',
        'superscript',
        '|',
        'bulletedList',
        'numberedList',
        'indent',
        'outdent',
        '|',
        'link',
        'blockQuote',
        'codeBlock',
        'insertTable',
        'horizontalLine',
        '|',
        'undo',
        'redo'
      ]
    }
  };

  public controlType: string = 'ckeditor';

  public editor: CKEditor5.EditorConstructor = InlineEditor;

  public focused: boolean;

  public id: string;

  public ngControl: NgControl = null;

  public placeholder: string;

  @ViewChild(CKEditorComponent, { static: true })
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

  public ngOnInit(): void {
    this.parent._control = this;
  }

  public ngAfterViewInit(): void {
    this.id = this.field.name;

    merge(
      this.instance.blur.pipe(map(() => false)),
      this.instance.focus.pipe(map(() => true))
    ).pipe(
      tap((focused) => focused || this.control.markAsTouched())
    ).subscribe((focused) => this.changes.next(this.focused = focused));
  }

  public ngOnDestroy(): void {
    this.changes.complete();
  }

  public onContainerClick(_: Event): void { }

  public setDescribedByIds(_: string[]): void { }

}
