import { EventEmitter, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface DrawerCompat {

  changed: EventEmitter<boolean>;

  readonly compat: string;

  instance: any;

  main: TemplateRef<any>;

  menu: TemplateRef<any>;

  visible: Observable<boolean>;

  drawn(state: boolean): void;

  hide(): void;

  show(): void;

  toggle(): void;

}
