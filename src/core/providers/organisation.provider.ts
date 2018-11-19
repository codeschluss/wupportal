import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { OrganisationControllerService } from '../api/services/organisation-controller.service';
import { BaseProvider } from '../base/base.provider';
import { AddressModel } from '../models/address.model';
import { OrganisationModel } from '../models/organisation.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class OrganisationProvider
  extends BaseProvider<OrganisationControllerService, OrganisationModel> {

  protected linked = [
    {
      field: 'activities',
      method: this.service.organisationControllerFindActivitiesResponse,
      model: OrganisationModel
    },
    {
      field: 'address',
      method: this.service.organisationControllerFindAddress,
      model: AddressModel
    },
    {
      field: 'users',
      method: this.service.organisationControllerFindUsersByOrganisationResponse,
      model: UserModel
    }
  ];

  protected methods = {
    findAll: this.service.organisationControllerFindAllResponse,
    findOne: this.service.organisationControllerFindOneResponse,
    add: this.service.organisationControllerAddResponse,
    update: this.service.organisationControllerUpdateResponse,
    delete: this.service.organisationControllerDeleteResponse
  };

  protected model = this.provide(OrganisationModel);

  public constructor(
    protected injector: Injector,
    protected service: OrganisationControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

}
