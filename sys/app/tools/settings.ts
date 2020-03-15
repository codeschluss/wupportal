import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApplicationSettings {

  public author: {
    name: string,
    email: string,
    url: string
  };

  public bugs: {
    email: string,
    url: string
  };

  public config: {
    api: {
      authUrl: string,
      refreshUrl: string,
      rootUrl: string
    },
    defaults: {
      appUrl: string,
      city: string,
      language: string,
      title: string
    },
    firebase: {
      apiKey: string,
      appId: string,
      messagingSenderId: string,
      projectId: string
    },
    jwtClaims: {
      activityProvider: string,
      organisationAdmin: string,
      organisationUser: string,
      superUser: string,
      userId: string
    }
  };

  public nativescript: {
    appId: string,
    id: string
  };

  public repository: {
    type: string,
    url: string
  };

}
