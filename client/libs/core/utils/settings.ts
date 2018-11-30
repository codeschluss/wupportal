import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CoreSettings {

  public authUrl: string = '/api/login';

  public refreshUrl: string = '/api/refresh';

}
