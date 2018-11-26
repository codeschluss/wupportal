import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccessTokenModel } from '../auth/access-token.model';
import { SessionProvider } from '../session/session.provider';
import { ClientPackage } from '../utils/package';

@Injectable({ providedIn: 'root' })
export class SuperUserGuard implements CanActivate {

  private token: AccessTokenModel;

  public constructor(
    private clientPackage: ClientPackage,

    sessionProvider: SessionProvider
  ) {
    sessionProvider.subscribe((session) => this.token = session.accessToken);
  }

  public canActivate(): boolean {
    const claim = this.clientPackage.config.jwt.claimSuperUser;
    return this.token[claim];
  }

}
