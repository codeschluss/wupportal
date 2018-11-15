import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { OrganisationControllerService } from '../api/services/organisation-controller.service';
import { OrganisationModel } from '../models/organisation.model';
import { AbstractProvider } from './abstract.provider';

@Injectable({ providedIn: 'root' })
export class OrganisationProvider
  extends AbstractProvider<OrganisationControllerService, OrganisationModel> {

  protected mapping = {
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
