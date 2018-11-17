import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { OrganisationControllerService } from '../api/services/organisation-controller.service';
import { BaseProvider } from '../base/base.provider';
import { OrganisationModel } from '../models/organisation.model';

@Injectable({ providedIn: 'root' })
export class OrganisationProvider
  extends BaseProvider<OrganisationControllerService, OrganisationModel> {

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
