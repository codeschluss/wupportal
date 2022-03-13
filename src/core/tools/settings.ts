import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CoreSettings {

  public api: {
    authUrl: string;
    refreshUrl: string;
    rootUrl: string;
  };

  public app: {
    baseUrl: string;
    profile: 'development' | 'production';
  };

  public defaults: {
    city: string;
    language: string;
    title: string;
  };

  public jwtClaims: {
    activityProvider: string;
    blogger: string;
    blogpostAuthor: string;
    fullname: string;
    organisationAdmin: string;
    organisationUser: string;
    superUser: string;
    translator: string;
    userId: string;
  };

  public labelHeader: {
    read: string;
    write: string;
  };

  public storeIds: {
    android: string;
    ios: string;
  };

}
