import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'src/services/services';

@Injectable()
abstract class AccountGuard implements CanActivate {

  protected abstract claimed(): boolean;

  public constructor(
    protected userService: UserService
  ) { }

  public canActivate(): boolean {
    return this.claimed();
  }

}

export class UserGuard extends AccountGuard {
  public constructor(protected userService: UserService) { super(userService); }
  protected claimed(): boolean { return this.userService.claimUser(); }
}

export class ProviderGuard extends AccountGuard {
  public constructor(protected userService: UserService) { super(userService); }
  protected claimed(): boolean { return this.userService.claimProvider(''); }
}

export class AdminGuard extends AccountGuard {
  public constructor(protected userService: UserService) { super(userService); }
  protected claimed(): boolean { return this.userService.claimAdmin(''); }
}

export class SuperAdminGuard extends AccountGuard {
  public constructor(protected userService: UserService) { super(userService); }
  protected claimed(): boolean { return this.userService.claimSuperAdmin(); }
}
