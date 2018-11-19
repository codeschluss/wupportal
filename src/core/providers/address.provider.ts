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
      method: this.service.addressControllerFindSuburb,
      model: SuburbModel,
      multi: false
    }
  ];

  protected methods = {
    findAll: this.service.addressControllerFindAllResponse,
    findOne: this.service.addressControllerFindOneResponse,
    add: this.service.addressControllerAddResponse,
    update: this.service.addressControllerUpdateResponse,
    delete: this.service.addressControllerDeleteResponse
  };

  protected model = AddressModel;

  public constructor(
    protected injector: Injector,
    protected service: AddressControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

}
