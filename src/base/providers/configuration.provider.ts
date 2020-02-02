import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { Observable } from 'rxjs';
import { ConfigurationControllerService } from '../../api/services/configuration-controller.service';
import { ConfigurationModel } from '../models/configuration.model';

@Injectable({ providedIn: 'root' })
export class ConfigurationProvider
  extends CrudProvider<ConfigurationControllerService, ConfigurationModel> {

  public create: (model: ConfigurationModel) => Observable<any>;

  public update: (model: ConfigurationModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<ConfigurationModel>;

  public readAll: (params?: ConfigurationControllerService
    .ConfigurationControllerReadAllParams) => Observable<ConfigurationModel[]>;

  protected linked: CrudLink[] = [];

  protected methods: CrudMethods = {
    create: this.service.configurationControllerCreateResponse,
    delete: this.service.configurationControllerDeleteResponse,
    readAll: this.service.configurationControllerReadAllResponse,
    readOne: this.service.configurationControllerReadOneResponse,
    update: this.service.configurationControllerUpdateResponse
  };

  protected model: Type<ConfigurationModel> = this.based(ConfigurationModel);

  public constructor(
    protected service: ConfigurationControllerService
  ) {
    super();
  }

}
