import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ConfigurationControllerService } from '../api/services/configuration-controller.service';
import { BaseProvider } from '../base/base.provider';
import { ConfigurationModel } from '../models/configuration.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationProvider
  extends BaseProvider<ConfigurationControllerService, ConfigurationModel> {

  protected linked = [];

  protected methods = {
    create: this.service.configurationControllerAddResponse,
    delete: this.service.configurationControllerDeleteResponse,
    findAll: this.service.configurationControllerFindAllResponse,
    findOne: this.service.configurationControllerFindOneResponse,
    update: this.service.configurationControllerUpdateResponse
  };

  protected model = this.based(ConfigurationModel);

  public constructor(
    protected injector: Injector,
    protected service: ConfigurationControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

}
