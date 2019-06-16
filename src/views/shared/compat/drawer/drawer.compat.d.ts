import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface DrawerCompat {

  main: TemplateRef<any>;

  menu: TemplateRef<any>;

  instance: any;

  visible: Observable<boolean>;

  hide(): void;

  show(): void;

  toggle(): void;

}
