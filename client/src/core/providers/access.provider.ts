import { Injectable } from '@angular/core';
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
      this.organisationProvider.system.apply(this.organisationProvider.system
        .service.organisationControllerGrantAdminRightResponse);

  public grantOrganisationUser:
    (organisationId: string, userId: string, grant: boolean) => Promise<any> =
      this.organisationProvider.system.apply(this.organisationProvider.system
        .service.organisationControllerApproveOrRejectUserResponse);

  public grantSuperUser:
    (userId: string, grant: boolean) => Promise<any> =
      this.userProvider.system.apply(this.userProvider.system
        .service.userControllerGrantSuperuserRightResponse);

  public resetPassword:
    (username: string) => Promise<any> =
      this.userProvider.system.apply(this.userProvider.system
        .service.userControllerResetPasswordResponse);

}
