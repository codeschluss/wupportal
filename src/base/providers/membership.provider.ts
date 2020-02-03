import { Injectable, Type } from '@angular/core';
import { BaseService, CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY } from 'rxjs';
import { ActivityModel } from '../models/activity.model';
import { MembershipModel } from '../models/membership.model';
import { OrganisationModel } from '../models/organisation.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class MembershipProvider
  extends CrudProvider<BaseService, MembershipModel> {

  protected linked: CrudLink[] = [
    {
      field: 'activities',
      method: () => EMPTY,
      model: ActivityModel
    },
    {
      field: 'organisation',
      method: () => EMPTY,
      model: OrganisationModel
    },
    {
      field: 'user',
      method: () => EMPTY,
      model: UserModel
    }
  ];

  protected methods: CrudMethods;

  protected model: Type<MembershipModel> = this.based(MembershipModel);

  protected service: BaseService;

}
