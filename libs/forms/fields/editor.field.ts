import { Component, Type } from '@angular/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { InlineEditor } from '@wooportal/editor';
import { BaseFieldComponent } from '../base/base.field';

@Component({
  styles: [`
    :host ::ng-deep .ck-content {
      border: 0 !important;
      box-shadow: none !important;
      padding: 0 !important;
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
      [data]="value"
      [editor]="editor"
      [id]="field.name">
      <input matInput>
    </ckeditor>
  `)
})

export class EditorFieldComponent extends BaseFieldComponent {

  public readonly editor: Type<CKEditor5.Editor> = InlineEditor;

}
