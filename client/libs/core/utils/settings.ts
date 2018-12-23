import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CoreSettings {

  public apiAuthUrl: string;

  public apiRefreshUrl: string;

  public nominatimEndpoint: string;

  public nominatimParams: string;

}
