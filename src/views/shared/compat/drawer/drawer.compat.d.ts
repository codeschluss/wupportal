import { Observable } from 'rxjs';

export interface DrawerCompat {

  instance: any;

  visible: Observable<boolean>;

  hide(): void;

  show(): void;

  toggle(): void;

}
