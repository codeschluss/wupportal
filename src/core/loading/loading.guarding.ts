import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router, UrlTree } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PlatformProvider } from '../platform/platform.provider';

@Injectable({
  providedIn: 'root'
})

export class LoadingGuarding
  implements CanActivate, CanDeactivate<boolean | UrlTree> {

  private netsplit: UrlTree = this.router.createUrlTree(['/', 'netsplit']);

  public constructor(
    private platformProvider: PlatformProvider,
    private router: Router
  ) {
    platformProvider.connection.pipe(filter((state) => !state))
      .subscribe(() => router.navigateByUrl(this.netsplit));
  }

  public canActivate(): boolean | UrlTree {
    return this.platformProvider.connected || this.netsplit;
  }

  public canDeactivate(): boolean {
    return this.platformProvider.connected;
  }

}
