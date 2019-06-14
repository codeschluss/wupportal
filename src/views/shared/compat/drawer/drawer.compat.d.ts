import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export declare class DrawerCompat {

  public main: TemplateRef<any>;

  public menu: TemplateRef<any>;

  public instance: any;

  public visible: Observable<boolean>;

  public hide(): void;

  public show(): void;

  public toggle(): void;

}
