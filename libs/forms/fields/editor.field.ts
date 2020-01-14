import { Component } from '@angular/core';
import { CKEditor5 as CKEditor } from '@ckeditor/ckeditor5-angular';
import * as CKInlineEditor from '@ckeditor/ckeditor5-build-inline';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    :host ::ng-deep .ck-content {
      border: 0 !important;
      box-shadow: none !important;
      padding: 0 !important;
    }
    :host ::ng-deep .ck-content > :first-child {
      margin-top: .25rem;
    }
    :host ::ng-deep .ck-content > :last-child {
      margin-bottom: 0;
    }
  `],
  template: BaseFieldComponent.template(`
    <ckeditor
      [config]="config"
      [data]="value"
      [editor]="editor"
      (change)="value = $event.editor.getData()">
      <input matInput>
    </ckeditor>
  `)
})

export class EditorFieldComponent extends BaseFieldComponent {

  public readonly config: CKEditor.Config = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'blockQuote',
      'indent',
      'outdent',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'link',
      '|',
      'undo',
      'redo'
    ]
  };

  public readonly editor: CKEditor.Editor = CKInlineEditor;

}
