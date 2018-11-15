import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AddressControllerService } from '../api/services/address-controller.service';
import { AddressModel } from '../models/address.model';
import { AbstractProvider } from './abstract.provider';

@Injectable({ providedIn: 'root' })
export class AddressProvider
  extends AbstractProvider<AddressControllerService, AddressModel> {

  protected mapping = {
    findAll: this.service.addressControllerFindAllResponse,
    findOne: this.service.addressControllerFindOneResponse,
    add: this.service.addressControllerAddResponse,
    update: this.service.addressControllerUpdateResponse,
    delete: this.service.addressControllerDeleteResponse
  };

  protected model = AddressModel;

  public constructor(
    protected service: AddressControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
