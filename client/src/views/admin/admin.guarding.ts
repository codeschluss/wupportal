import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { JwtClaims, Pathfinder, SessionProvider } from '@portal/core';
import { take } from 'rxjs/operators';
import { ClientComponent } from '../../client.component';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { AddressStepperComponent } from '../../realm/address/address.stepper';
import { CategoryStepperComponent } from '../../realm/category/category.stepper';
import { LanguageStepperComponent } from '../../realm/language/language.stepper';
import { OrganisationStepperComponent } from '../../realm/organisation/organisation.stepper';
import { SuburbStepperComponent } from '../../realm/suburb/suburb.stepper';
import { TagStepperComponent } from '../../realm/tag/tag.stepper';
import { TargetGroupStepperComponent } from '../../realm/target-group/target-group.stepper';
import { UserStepperComponent } from '../../realm/user/user.stepper';
import { ClientPackage } from '../../utils/package';
import { AccountPanelComponent } from './account/account.panel';
import { AdminComponent } from './admin.component';
import { ApplicationPanelComponent } from './application/application.panel';
import { OrganisationPanelComponent } from './organisation/organisation.panel';

@Injectable({ providedIn: 'root' })
export class AdminGuarding implements CanActivate, CanActivateChild {

  public constructor(
    private pathfinder: Pathfinder,
    private router: Router,
    private session: SessionProvider
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): Promise<any> {
    return this.allow(route);
  }

  public canActivateChild(route: ActivatedRouteSnapshot): Promise<any> {
    return this.allow(route);
  }

  private async allow(route: ActivatedRouteSnapshot): Promise<any> {
    const jwtClaims = ClientPackage.config.jwtClaims;
    const session = await this.session.value.pipe(take(1)).toPromise();
    const userId = session.accessToken.id;

    const claim: JwtClaims = Object.keys(jwtClaims).reduce(
      (claims, key) => claims[key] = session.accessToken[jwtClaims[key]], { });

    if ((() => {
      switch (route.component) {
        default:
        return false;

        case AdminComponent:
        return userId;

        case AccountPanelComponent:
        return route.params.uuid === userId;

        case OrganisationPanelComponent:
        return claim.organisationAdmin.length;

        case ApplicationPanelComponent:
        return claim.superUser;

        case ActivityStepperComponent:
        return claim.superUser
          || claim.activityProvider.includes(route.params.uuid);

        case AddressStepperComponent:
        return claim.superUser;

        case CategoryStepperComponent:
        return claim.superUser;

        case LanguageStepperComponent:
        return claim.superUser;

        case OrganisationStepperComponent:
        return claim.superUser
          || claim.organisationAdmin.includes(route.params.uuid);

        case SuburbStepperComponent:
        return claim.superUser;

        case TagStepperComponent:
        return claim.superUser;

        case TargetGroupStepperComponent:
        return claim.superUser;

        case UserStepperComponent:
        return claim.superUser
          || userId === route.params.uuid;
      }
    })()) { return true; }

    this.router.navigate(userId
      ? this.pathfinder.to(AdminComponent)
      : this.pathfinder.to(ClientComponent));
  }

}
