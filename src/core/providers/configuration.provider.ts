import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ConfigurationControllerService } from '../api/services/configuration-controller.service';
import { BaseProvider } from '../base/base.provider';
import { ConfigurationModel } from '../models/configuration.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationProvider
  extends BaseProvider<ConfigurationControllerService, ConfigurationModel> {

  protected linked = [];

  protected methods = {
    findAll: this.service.configurationControllerFindAllResponse,
    findOne: this.service.configurationControllerFindOneResponse,
    add: this.service.configurationControllerAddResponse,
    update: this.service.configurationControllerUpdateResponse,
    delete: this.service.configurationControllerDeleteResponse
  };

  protected model = ConfigurationModel;

  public constructor(
    protected service: ConfigurationControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
