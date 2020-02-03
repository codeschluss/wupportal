import { EventEmitter, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface ExpandComponent {

  changed: EventEmitter<boolean>;

  readonly component: string;

  content: TemplateRef<any>;

  header: TemplateRef<any>;

  instance: any;

  expanded: Observable<boolean>;

  close(): void;

  open(): void;

  toggle(): void;

}
