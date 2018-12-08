import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { AddressControllerService } from '../../api/services/address-controller.service';
import { AddressModel } from '../address/address.model';
import { SuburbModel } from '../suburb/suburb.model';

@Injectable({ providedIn: 'root' })
export class AddressProvider
  extends CrudProvider<AddressControllerService, AddressModel> {

  protected linked = [
    {
      field: 'suburb',
      method: this.service.addressControllerFindSuburbResponse,
      model: SuburbModel,
    }
  ];

  protected methods = {
    create: this.service.addressControllerCreateResponse,
    delete: this.service.addressControllerDeleteResponse,
    findAll: this.service.addressControllerReadAllResponse,
    findOne: this.service.addressControllerReadOneResponse,
    update: this.service.addressControllerUpdateResponse
  };

  protected model = this.based(AddressModel);

  public constructor(
    protected injector: Injector,
    protected service: AddressControllerService
  ) {
    super();
  }

  public create: (model: AddressModel) => Promise<any>;

  public update: (id: string, model: AddressModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<AddressModel>;

  public findAll: (params?: AddressControllerService
    .AddressControllerReadAllParams) => Promise<AddressModel[]>;

  public relinkSuburb:
    (id: string, suburbId: string) => Promise<any> =
      this.apply(this.service.addressControllerUpdateSuburbResponse);

}
