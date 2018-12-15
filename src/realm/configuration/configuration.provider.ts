import { Injectable } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { ConfigurationControllerService } from '../../api/services/configuration-controller.service';
import { ConfigurationModel } from '../configuration/configuration.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationProvider
  extends CrudProvider<ConfigurationControllerService, ConfigurationModel> {

  public create: (model: ConfigurationModel) => Observable<any>;

  public update: (id: string, model: ConfigurationModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<ConfigurationModel>;

  public readAll: (params?: ConfigurationControllerService
    .ConfigurationControllerReadAllParams) => Observable<ConfigurationModel[]>;

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
    protected service: ConfigurationControllerService
  ) {
    super();
  }

}
