import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { JwtClaims, Pathfinder, SplashHostComponent, TokenProvider } from '@portal/core';
import { take } from 'rxjs/operators';
import { ActivityFormComponent } from '../../realm/activity/activity.form';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { ActivityTableComponent } from '../../realm/activity/activity.table';
import { AddressFormComponent } from '../../realm/address/address.form';
import { ImageFormComponent } from '../../realm/image/image.form';
import { OrganisationFormComponent } from '../../realm/organisation/organisation.form';
import { OrganisationStepperComponent } from '../../realm/organisation/organisation.stepper';
import { OrganisationTableComponent } from '../../realm/organisation/organisation.table';
import { ScheduleFormComponent } from '../../realm/schedule/schedule.form';
import { TranslationFormComponent } from '../../realm/translation/translation.form';
import { UserFormComponent } from '../../realm/user/user.form';
import { UserStepperComponent } from '../../realm/user/user.stepper';
import { ClientPackage } from '../../utils/package';
import { AdminComponent } from './admin.component';
import { AccountPanelComponent } from './panels/account/account.panel';
import { OrganisationPanelComponent } from './panels/organisation/organisation.panel';

@Injectable({ providedIn: 'root' })
export class AdminGuarding implements CanActivate, CanActivateChild {

  public constructor(
    private pathfinder: Pathfinder,
    private router: Router,
    private tokenProvider: TokenProvider
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): Promise<any> {
    return this.allow(route);
  }

  public canActivateChild(route: ActivatedRouteSnapshot): Promise<any> {
    return this.allow(route);
  }

  private async allow(route: ActivatedRouteSnapshot): Promise<any> {
    const claims = ClientPackage.config.jwtClaims;
    const tokens = await this.tokenProvider.value.pipe(take(1)).toPromise();
    const claimed = Object.keys(claims).reduce((claim, key) => Object.assign(
      claim, { [key]: tokens.access[claims[key]] }), { }) as JwtClaims;

    if ((() => {
      switch (route.component) {
        default: return claimed.superUser;

        case AccountPanelComponent:
        return route.params.uuid === claimed.userId;

        case ActivityFormComponent:
        case ActivityTableComponent:
        case AddressFormComponent:
        case AdminComponent:
        case ImageFormComponent:
        case OrganisationTableComponent:
        case ScheduleFormComponent:
        case SplashHostComponent:
        case TranslationFormComponent:
        case UserFormComponent:
        return claimed.userId;

        case OrganisationPanelComponent:
        return claimed.superUser
          || claimed.organisationAdmin.length;

        case ActivityStepperComponent:
        return claimed.superUser
          // || claims.organisationAdmin.includes(item.organisation.id)
          || claimed.activityProvider.includes(route.params.uuid);

        case OrganisationFormComponent:
        case OrganisationStepperComponent:
        return claimed.superUser
          || claimed.organisationAdmin.includes(route.params.uuid);

        case UserStepperComponent:
        return claimed.superUser
          || claimed.userId === route.params.uuid;
      }
    })()) { return true; }

    claimed.userId
      ? this.router.navigate(this.pathfinder.to(AdminComponent))
      : this.router.navigateByUrl('/');
  }

}
