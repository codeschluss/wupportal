import { Type } from '@angular/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import { EditorPackage } from '../utils/package';
import { plugins } from './plugins';

const EditorBase: Type<CKEditor5.Editor> = InlineEditorBase;

export class InlineEditor extends EditorBase {

  public static builtinPlugins: Type<any>[] = plugins;

  public static defaultConfig: CKEditor5.Config = EditorPackage.config;

}
