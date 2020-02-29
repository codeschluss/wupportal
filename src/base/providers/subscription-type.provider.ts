import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { Observable } from 'rxjs';
import { SubscriptionTypeControllerService as Service } from '../../api/services/subscription-type-controller.service';
import { SubscriptionTypeModel as Model } from '../models/subscription-type.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionTypeProvider extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [];

  protected methods: CrudMethods = {
    create: this.service.subscriptionTypeControllerCreateResponse,
    delete: this.service.subscriptionTypeControllerDeleteResponse,
    readAll: this.service.subscriptionTypeControllerReadAllResponse,
    readOne: this.service.subscriptionTypeControllerReadOneResponse,
    update: this.service.subscriptionTypeControllerUpdateResponse
  };

  protected model: Type<Model> = this.based(Model);

  public constructor(
    protected service: Service
  ) {
    super();
  }

  public create: (model: Partial<Model>) => Observable<any>;

  public update: (model: Partial<Model>) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<Model>;

  public readAll: (params?: Service.SubscriptionTypeControllerReadAllParams) =>
    Observable<Model[]>;

}
