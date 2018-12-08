import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { ConfigurationControllerService } from '../../api/services/configuration-controller.service';
import { ConfigurationModel } from '../configuration/configuration.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationProvider
  extends CrudProvider<ConfigurationControllerService, ConfigurationModel> {

  public create: (model: ConfigurationModel) => Promise<any>;

  public update: (id: string, model: ConfigurationModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public readOne: (id: string) => Promise<ConfigurationModel>;

  public readAll: (params?: ConfigurationControllerService
    .ConfigurationControllerReadAllParams) => Promise<ConfigurationModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.configurationControllerCreateResponse,
    delete: this.service.configurationControllerDeleteResponse,
    readAll: this.service.configurationControllerReadAllResponse,
    readOne: this.service.configurationControllerReadOneResponse,
    update: this.service.configurationControllerUpdateResponse
  };

  protected model = this.based(ConfigurationModel);

  public constructor(
    protected injector: Injector,
    protected service: ConfigurationControllerService
  ) {
    super();
  }

}
