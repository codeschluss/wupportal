import { EventEmitter, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface ExpandCompat {

  changed: EventEmitter<boolean>;

  readonly compat: string;

  content: TemplateRef<any>;

  header: TemplateRef<any>;

  instance: any;

  expanded: Observable<boolean>;

  close(): void;

  open(): void;

  toggle(): void;

  update(state: boolean): void;

}
