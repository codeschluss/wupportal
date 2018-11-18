import { Injectable } from '@angular/core';
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
      model: OrganisationModel,
      multi: true
    },
    {
      field: 'address',
      method: this.service.organisationControllerFindAddress,
      model: AddressModel,
      multi: false
    },
    {
      field: 'users',
      method: this.service.organisationControllerFindUsersByOrganisationResponse,
      model: UserModel,
      multi: false
    }
  ];

  protected methods = {
    findAll: this.service.organisationControllerFindAllResponse,
    findOne: this.service.organisationControllerFindOneResponse,
    add: this.service.organisationControllerAddResponse,
    update: this.service.organisationControllerUpdateResponse,
    delete: this.service.organisationControllerDeleteResponse
  };

  protected model = OrganisationModel;

  public constructor(
    protected service: OrganisationControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
