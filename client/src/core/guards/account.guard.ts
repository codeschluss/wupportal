import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccessTokenModel } from '../auth/access-token.model';
import { SessionProvider } from '../session/session.provider';

@Injectable({ providedIn: 'root' })
export class AccountGuard implements CanActivate {

  private token: AccessTokenModel;

  public constructor(
    sessionProvider: SessionProvider
  ) {
    sessionProvider.subscribe((session) => this.token = session.accessToken);
  }

  public canActivate(): boolean {
    return !!this.token.raw;
  }

}
