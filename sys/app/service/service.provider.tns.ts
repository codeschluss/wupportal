import { Injectable } from '@angular/core';
import { ServiceProvider as Compat } from './service.provider.i';

@Injectable({ providedIn: 'root' })
export class ServiceProvider implements Compat {

  public update(): void { return void 0; }

}
