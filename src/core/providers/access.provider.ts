import { Injectable } from '@angular/core';
import { OrganisationControllerService } from '../api/services/organisation-controller.service';
import { UserControllerService } from '../api/services/user-controller.service';
import { OrganisationProvider } from '../providers/organisation.provider';
import { UserProvider } from '../providers/user.provider';

@Injectable({ providedIn: 'root' })
export class AccessProvider {

  public constructor(
    private organisationProvider: OrganisationProvider,
    private organisationService: OrganisationControllerService,
    private userProvider: UserProvider,
    private userService: UserControllerService
  ) { }

  public grantOrganisationAdmin:
    (organisationId: string, userId: string, grant: boolean) => Promise<any> =
      this.organisationProvider.apply(this.organisationService
        .organisationControllerGrantAdminRightResponse);

  public grantOrganisationUser:
    (organisationId: string, userId: string, grant: boolean) => Promise<any> =
      this.organisationProvider.apply(this.organisationService
        .organisationControllerApproveOrRejectUserResponse);

  public grantSuperUser:
    (userId: string, grant: boolean) => Promise<any> =
      this.userProvider.apply(this.userService
        .userControllerGrantSuperuserRightResponse);

  public resetPassword:
    (username: string) => Promise<any> =
      this.userProvider.apply(this.userService
        .userControllerResetPasswordResponse);

}
