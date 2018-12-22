import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { AddressControllerService } from '../../api/services/address-controller.service';
import { SuburbModel } from '../suburb/suburb.model';
import { AddressModel } from './address.model';

@Injectable({ providedIn: 'root' })
export class AddressProvider
  extends CrudProvider<AddressControllerService, AddressModel> {

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

  protected model: Type<AddressModel> = this.based(AddressModel);

  public constructor(
    protected service: AddressControllerService
  ) {
    super();
  }

  public create: (model: AddressModel) => Observable<any>;

  public update: (model: AddressModel, id: string) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<AddressModel>;

  public readAll: (params?: AddressControllerService
    .AddressControllerReadAllParams) => Observable<AddressModel[]>;

  public relinkSuburb:
    (id: string, suburbId: string) => Observable<any> =
      this.apply(this.service.addressControllerUpdateSuburbResponse);

}
