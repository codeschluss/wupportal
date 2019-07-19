import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { PlatformProvider, TokenProvider } from '@wooportal/core';
import { map, mergeMap, take } from 'rxjs/operators';
import { ActivityProvider } from '../../realm/providers/activity.provider';
import { ClientPackage } from '../../utils/package';

@Injectable({ providedIn: 'root' })
export class AdminGuarding implements CanActivate, CanActivateChild {

  public constructor(
    private activityProvider: ActivityProvider,
    private platformProvider: PlatformProvider,
    private router: Router,
    private tokenProvider: TokenProvider
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return this.platformProvider.name === 'Server'
      ? this.router.navigate(['/error', 403])
      : this.allow(route, state);
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return this.platformProvider.name === 'Server'
      ? this.router.navigate(['/error', 403])
      : this.allow(route, state);
  }

  private async allow(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    const tokens = await this.tokenProvider.value.pipe(take(1)).toPromise();

    const claims = ClientPackage.config.jwtClaims;
    const claimed = Object.keys(claims).reduce((claim, key) =>
      Object.assign(claim, { [key]: tokens.access[claims[key]] }), { }) as any;

    if (await (async () => {
      switch (true) {
        case state.url.startsWith('/admin/application'):
        case state.url.startsWith('/admin/positioning'):
        case state.url.startsWith('/admin/privileges'):
        default: return claimed.superUser;

        case state.url.startsWith('/admin/account'):
        return route.params.uuid === claimed.userId;

        case state.url.startsWith('/admin/organisation'):
        return claimed.superUser || claimed.organisationAdmin.length;

        case state.url.startsWith('/admin/edit/activities/'):
        return claimed.superUser
          || claimed.activityProvider.includes(this.uuid(state.url))
          || claimed.organisationAdmin.includes(await this.orga(state.url));

        case state.url.startsWith('/admin/edit/organisations/'):
        return claimed.superUser
          || claimed.organisationAdmin.includes(this.uuid(state.url));
      }
    })()) { return true; }

    return this.router.navigateByUrl(claimed.userId ? '/admin' : '/');
  }

  private orga(url: string): Promise<string> {
    return this.activityProvider.readOne(this.uuid(url))
      .pipe(mergeMap((i) => i.organisation), map((i) => i.id)).toPromise();
  }

  private uuid(url: string): string | undefined {
    const uuid = url.match(/[0-9A-F]{8}(-[0-9A-F]{4}){3}-[0-9A-F]{12}/i);
    return uuid ? uuid.shift() : undefined;
  }

}
