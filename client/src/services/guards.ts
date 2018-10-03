import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { UserService } from 'src/services/services';

@Injectable()
export class UserGuard implements CanActivate {

  public constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService
  ) { }

  public canActivate(): boolean {
    console.log(this.route);
    return false;
  }

}
