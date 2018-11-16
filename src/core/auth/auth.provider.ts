import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { BaseProvider } from '../base/base.provider';
import { AuthTokenModel } from './auth-token.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthProvider
  extends BaseProvider<AuthService, AuthTokenModel> {

  protected methods = {
    findAll: null,
    findOne: null,
    add: null,
    update: null,
    delete: null
  };

  protected model = AuthTokenModel;

  public constructor(
    protected service: AuthService,
    protected snackbar: MatSnackBar
  ) {
    super();

    delete this.findAll;
    delete this.findOne;
    delete this.add;
    delete this.update;
    delete this.delete;
  }

  public login(username: string, password: string) {
    return this.service.authEndpointLoginResponse(username, password).pipe(
      (map((i) => i))
    ).toPromise();
  }

}
