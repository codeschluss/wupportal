import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthTokens } from '../tools/api';
import { TokenProvider } from './token.provider';

@Injectable({
  providedIn: 'root'
})

export class TokenResolver
  implements Resolve<AuthTokens> {

  public constructor(
    private tokenProvider: TokenProvider
  ) { }

  public resolve(): Observable<AuthTokens> {
    return this.tokenProvider.value.pipe(take(1));
  }

}
