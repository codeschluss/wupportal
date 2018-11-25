import { Injectable } from '@angular/core';
import { OrganisationControllerService } from '../api/services/organisation-controller.service';
import { UserControllerService } from '../api/services/user-controller.service';
import { OrganisationProvider } from '../providers/organisation.provider';
import { UserProvider } from '../providers/user.provider';

@Injectable({ providedIn: 'root' })
export class AccessProvider {

  public constructor(
    private organisationProvider: OrganisationProvider,
    private userProvider: UserProvider
  ) { }

  public grantOrganisationAdmin:
    (organisationId: string, userId: string, grant: boolean) => Promise<any> =
      this.organisationProvider.system.apply(OrganisationControllerService
        .prototype.organisationControllerGrantAdminRightResponse);

  public grantOrganisationUser:
    (organisationId: string, userId: string, grant: boolean) => Promise<any> =
      this.organisationProvider.system.apply(OrganisationControllerService
        .prototype.organisationControllerApproveOrRejectUserResponse);

  public grantSuperUser:
    (userId: string, grant: boolean) => Promise<any> =
      this.userProvider.system.apply(UserControllerService
        .prototype.userControllerGrantSuperuserRightResponse);

  public resetPassword:
    (username: string) => Promise<any> =
      this.userProvider.system.apply(UserControllerService
        .prototype.userControllerResetPasswordResponse);

}
