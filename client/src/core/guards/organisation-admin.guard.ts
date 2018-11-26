import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccessTokenModel } from '../auth/access-token.model';
import { SessionProvider } from '../session/session.provider';
import { ClientPackage } from '../utils/package';

@Injectable({ providedIn: 'root' })
export class OrganisationAdminGuard implements CanActivate {

  private token: AccessTokenModel;

  public constructor(
    private clientPackage: ClientPackage,

    sessionProvider: SessionProvider
  ) {
    sessionProvider.subscribe((session) => this.token = session.accessToken);
  }

  public canActivate(): boolean {
    const claim = this.clientPackage.config.jwt.claimAdminOrgas;
    return this.token[claim].length > 0;
  }

}
