import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { Observable } from 'rxjs';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { AddressControllerService as Service } from '../../api/services/address-controller.service';
import { AddressModel as Model } from '../models/address.model';
import { SuburbModel } from '../models/suburb.model';

@Injectable({ providedIn: 'root' })
export class AddressProvider extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'suburb',
      method: this.service.addressControllerReadSuburbResponse,
      model: SuburbModel,
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.addressControllerCreateResponse,
    delete: this.service.addressControllerDeleteResponse,
    readAll: this.service.addressControllerReadAllResponse,
    readOne: this.service.addressControllerReadOneResponse,
    update: this.service.addressControllerUpdateResponse
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

  public readAll: (params?: Service.AddressControllerReadAllParams) =>
    Observable<Model[]>;

  public lookup: (model: Model) =>
    Observable<any> = this.apply(this.service
      .addressControllerLookupResponse);

  public relinkSuburb: (id: string, suburbId: String) =>
    Observable<any> = this.apply(this.service
      .addressControllerUpdateSuburbResponse);

}
