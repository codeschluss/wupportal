import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { JwtClaims, Pathfinder, SessionProvider, SplashHostComponent } from '@portal/core';
import { take } from 'rxjs/operators';
import { ClientComponent } from '../../client.component';
import { ActivityFormComponent } from '../../realm/activity/activity.form';
import { ActivityStepperComponent } from '../../realm/activity/activity.stepper';
import { ActivityTableComponent } from '../../realm/activity/activity.table';
import { AddressFormComponent } from '../../realm/address/address.form';
import { AddressStepperComponent } from '../../realm/address/address.stepper';
import { AddressTableComponent } from '../../realm/address/address.table';
import { CategoryFormComponent } from '../../realm/category/category.form';
import { CategoryStepperComponent } from '../../realm/category/category.stepper';
import { CategoryTableComponent } from '../../realm/category/category.table';
import { ConfigurationFormComponent } from '../../realm/configuration/configuration.form';
import { ImageFormComponent } from '../../realm/image/image.form';
import { LanguageFormComponent } from '../../realm/language/language.form';
import { LanguageStepperComponent } from '../../realm/language/language.stepper';
import { LanguageTableComponent } from '../../realm/language/language.table';
import { OrganisationFormComponent } from '../../realm/organisation/organisation.form';
import { OrganisationStepperComponent } from '../../realm/organisation/organisation.stepper';
import { OrganisationTableComponent } from '../../realm/organisation/organisation.table';
import { ScheduleFormComponent } from '../../realm/schedule/schedule.form';
import { SuburbFormComponent } from '../../realm/suburb/suburb.form';
import { SuburbStepperComponent } from '../../realm/suburb/suburb.stepper';
import { SuburbTableComponent } from '../../realm/suburb/suburb.table';
import { TagFormComponent } from '../../realm/tag/tag.form';
import { TagStepperComponent } from '../../realm/tag/tag.stepper';
import { TagTableComponent } from '../../realm/tag/tag.table';
import { TargetGroupFormComponent } from '../../realm/target-group/target-group.form';
import { TargetGroupStepperComponent } from '../../realm/target-group/target-group.stepper';
import { TargetGroupTableComponent } from '../../realm/target-group/target-group.table';
import { TranslationFormComponent } from '../../realm/translation/translation.form';
import { UserFormComponent } from '../../realm/user/user.form';
import { UserStepperComponent } from '../../realm/user/user.stepper';
import { UserTableComponent } from '../../realm/user/user.table';
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

    const claims = Object.keys(jwtClaims).reduce((claim, key) => Object.assign(
      claim, { [key]: session.accessToken[jwtClaims[key]] }), { }) as JwtClaims;

    if ((() => {
      switch (route.component) {
        default: return false;

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
        return userId;

        case AccountPanelComponent:
        return route.params.uuid === userId;

        case OrganisationPanelComponent:
        return claims.superUser
          || claims.organisationAdmin.length;

        case ActivityStepperComponent:
        return claims.superUser
          // || claims.organisationAdmin.includes(item.organisation.id)
          || claims.activityProvider.includes(route.params.uuid);

        case OrganisationFormComponent:
        case OrganisationStepperComponent:
        return claims.superUser
          || claims.organisationAdmin.includes(route.params.uuid);

        case UserStepperComponent:
        return claims.superUser
          || userId === route.params.uuid;

        case ApplicationPanelComponent:
        case AddressStepperComponent:
        case AddressTableComponent:
        case CategoryFormComponent:
        case CategoryStepperComponent:
        case CategoryTableComponent:
        case ConfigurationFormComponent:
        case LanguageFormComponent:
        case LanguageStepperComponent:
        case LanguageTableComponent:
        case SuburbFormComponent:
        case SuburbStepperComponent:
        case SuburbTableComponent:
        case TagFormComponent:
        case TagStepperComponent:
        case TagTableComponent:
        case TargetGroupFormComponent:
        case TargetGroupStepperComponent:
        case TargetGroupTableComponent:
        case UserTableComponent:
        return claims.superUser;
      }
    })()) { return true; }

    this.router.navigate(userId
      ? this.pathfinder.to(AdminComponent)
      : this.pathfinder.to(ClientComponent));
  }

}
