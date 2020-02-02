import { EventEmitter, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface DrawerComponent {

  changed: EventEmitter<boolean>;

  readonly component: string;

  instance: any;

  main: TemplateRef<any>;

  menu: TemplateRef<any>;

  visible: Observable<boolean>;

  drawn(state: boolean): void;

  hide(): void;

  show(): void;

  toggle(): void;

}
