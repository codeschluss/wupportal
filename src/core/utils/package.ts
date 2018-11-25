import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientPackage {

  private packageJson: any = require('package.json');

  public get bugs(): {
    email: string,
    url: string
  } {
    return this.packageJson.bugs;
  }

  public get config(): {
    apiRootUrl: string,
    apiAuthUrl: string,
    apiRefreshUrl: string
  } {
    return this.packageJson.config;
  }

  public get repository(): {
    type: string,
    url: string
  } {
    return this.packageJson.repository;
  }

}
