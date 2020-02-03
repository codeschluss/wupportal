import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router, UrlTree } from '@angular/router';
import { DeviceProvider } from '@wooportal/app';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingGuarding
  implements CanActivate, CanDeactivate<boolean | UrlTree> {

  private netsplit: UrlTree = this.router.createUrlTree(['/', 'netsplit']);

  public constructor(
    private deviceProvider: DeviceProvider,
    private router: Router
  ) {
    deviceProvider.connection.pipe(filter((state) => !state))
      .subscribe(() => router.navigateByUrl(this.netsplit));
  }

  public canActivate(): boolean | UrlTree {
    return this.deviceProvider.connected || this.netsplit;
  }

  public canDeactivate(): boolean {
    return this.deviceProvider.connected;
  }

}
