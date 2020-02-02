import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { ApplicationSettings } from '@wooportal/app';
import { JwtClaims, TokenProvider } from '@wooportal/core';
import { map, mergeMap, take } from 'rxjs/operators';
import { ActivityProvider } from '../../base/providers/activity.provider';

@Injectable({ providedIn: 'root' })
export class AdminGuarding implements CanActivate, CanActivateChild {

  public constructor(
    private activityProvider: ActivityProvider,
    private app: ApplicationSettings,
    private router: Router,
    private tokenProvider: TokenProvider
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return this.allow(route, state);
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return this.allow(route, state);
  }

  private async allow(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    const access = await this.tokenProvider.value.pipe(
      take(1), map((tokens) => tokens.access)
    ).toPromise();

    const claims = this.app.config.jwtClaims;
    const claimed = Object.keys(claims).reduce((claim, key) =>
      Object.assign(claim, { [key]: access[claims[key]] }), { }) as JwtClaims;

    if (await (async () => {
      switch (true) {
        case state.url.startsWith('/admin/application'):
        case state.url.startsWith('/admin/positioning'):
        case state.url.startsWith('/admin/privileges'):
        default: return claimed.superUser;

        case state.url.startsWith('/admin/account'):
        return claimed.userId === this.uuid(state.url);

        case state.url.startsWith('/admin/organisation'):
        return claimed.superUser || claimed.organisationAdmin.length;

        case state.url.startsWith('/admin/edit/activities/'):
        return claimed.superUser
          || (claimed.userId && !this.uuid(state.url))
          || claimed.activityProvider.includes(this.uuid(state.url))
          || claimed.organisationAdmin.includes(await this.orga(state.url));

        case state.url.startsWith('/admin/edit/organisations/'):
        return claimed.superUser
          || (claimed.userId && !this.uuid(state.url))
          || claimed.organisationAdmin.includes(this.uuid(state.url));
      }
    })()) { return true; }

    return this.router.navigate(
      claimed.userId
        ? ['/', 'admin', 'account', claimed.userId]
        : ['/', 'error', 403]
    );
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
