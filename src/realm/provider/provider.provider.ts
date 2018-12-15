import { Injectable } from '@angular/core';
import { BaseService, CrudProvider } from '@portal/core';
import { ActivityModel } from '../activity/activity.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ProviderModel } from '../provider/provider.model';

@Injectable({ providedIn: 'root' })
export class ProviderProvider
  extends CrudProvider<BaseService, ProviderModel> {

  protected linked = [
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

  protected model = this.based(ProviderModel);

  protected service;

}
