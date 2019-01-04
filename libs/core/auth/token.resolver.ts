import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthTokens } from '../utils/api';
import { TokenProvider } from './token.provider';

@Injectable({ providedIn: 'root' })
export class TokenResolver implements Resolve<AuthTokens> {

  public constructor(
    private tokenProvider: TokenProvider
  ) { }

  public async resolve(): Promise<AuthTokens> {
    return this.run();
  }

  private async run(): Promise<AuthTokens> {
    return await this.tokenProvider.value.pipe(take(1)).toPromise();
  }

}
