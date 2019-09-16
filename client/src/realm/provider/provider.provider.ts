import { Injectable, Type } from '@angular/core';
import { BaseService, CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { empty } from 'rxjs';
import { ActivityModel } from '../activity/activity.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ProviderModel } from '../provider/provider.model';
import { UserModel } from '../user/user.model';

@Injectable({ providedIn: 'root' })
export class ProviderProvider
  extends CrudProvider<BaseService, ProviderModel> {

  protected linked: CrudLink[] = [
    {
      field: 'activities',
      method: () => empty(),
      model: ActivityModel
    },
    {
      field: 'organisation',
      method: () => empty(),
      model: OrganisationModel
    },
    {
      field: 'user',
      method: () => empty(),
      model: UserModel
    }
  ];

  protected methods: CrudMethods;

  protected model: Type<ProviderModel> = this.based(ProviderModel);

  protected service: BaseService;

}
