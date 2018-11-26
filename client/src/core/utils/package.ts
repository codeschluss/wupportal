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
    api: {
      rootUrl: string,
      authUrl: string,
      refreshUrl: string
    },
    jwt: {
      claimAdminOrgas: string,
      claimApprovedOrgas: string,
      claimCreatedActivities: string,
      claimSuperUser: string
    }
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
