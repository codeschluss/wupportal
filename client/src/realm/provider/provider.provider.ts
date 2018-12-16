import { Injectable, Type } from '@angular/core';
import { BaseService, CrudLink, CrudProvider } from '@portal/core';
import { ActivityModel } from '../activity/activity.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ProviderModel } from '../provider/provider.model';

@Injectable({ providedIn: 'root' })
export class ProviderProvider
  extends CrudProvider<BaseService, ProviderModel> {

  protected linked: CrudLink[] = [
    {
      field: 'activity',
      method: null,
      model: ActivityModel
    },
    {
      field: 'organisation',
      method: null,
      model: OrganisationModel
    }
  ];

  protected methods;

  protected model: Type<ProviderModel> = this.based(ProviderModel);

  protected service;

}
