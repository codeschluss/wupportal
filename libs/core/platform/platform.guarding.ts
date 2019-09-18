import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router, UrlTree } from '@angular/router';
import { PlatformProvider } from './platform.provider';

@Injectable({ providedIn: 'root' })
export class PlatformGuarding
  implements CanActivate, CanDeactivate<boolean | UrlTree> {

  private offline: UrlTree = this.router.createUrlTree(['/', 'offline']);

  public constructor(
    private platformProvider: PlatformProvider,
    private router: Router
  ) { }

  public canActivate(): boolean | UrlTree {
    return this.platformProvider.connected || this.offline;
  }

  public canDeactivate(): boolean {
    return this.platformProvider.connected;
  }

}
