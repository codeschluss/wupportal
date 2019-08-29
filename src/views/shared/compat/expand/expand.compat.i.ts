import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface ExpandCompat {

  readonly compat: string;

  content: TemplateRef<any>;

  header: TemplateRef<any>;

  instance: any;

  visible: Observable<boolean>;

  expanded(state: boolean): void;

  hide(): void;

  show(): void;

  toggle(): void;

}
