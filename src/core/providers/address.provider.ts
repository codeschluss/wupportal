import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AddressControllerService } from '../api/services/address-controller.service';
import { BaseProvider } from '../base/base.provider';
import { AddressModel } from '../models/address.model';
import { SuburbModel } from '../models/suburb.model';

@Injectable({ providedIn: 'root' })
export class AddressProvider
  extends BaseProvider<AddressControllerService, AddressModel> {

  protected linked = [
    {
      field: 'suburb',
      method: this.service.addressControllerFindSuburbResponse,
      model: SuburbModel,
    }
  ];

  protected methods = {
    create: this.service.addressControllerAddResponse,
    delete: this.service.addressControllerDeleteResponse,
    findAll: this.service.addressControllerFindAllResponse,
    findOne: this.service.addressControllerFindOneResponse,
    update: this.service.addressControllerUpdateResponse
  };

  protected model = this.based(AddressModel);

  public constructor(
    protected injector: Injector,
    protected service: AddressControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

  public create: (model: AddressModel) => Promise<any>;

  public update: (id: string, model: AddressModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<AddressModel>;

  public findAll: (params: AddressControllerService
    .AddressControllerFindAllParams) => Promise<AddressModel[]>;

  public relinkSuburb:
    (id: string, suburbId: string) => Promise<any> =
      this.apply(this.service.addressControllerUpdateSuburbResponse);

}
