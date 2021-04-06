import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationControllerService as Service } from '../../api/services/configuration-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { ConfigurationModel as Model } from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})

export class ConfigurationProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [];

  protected methods: CrudMethods = {
    create: this.service.configurationControllerCreateResponse,
    delete: this.service.configurationControllerDeleteResponse,
    readAll: this.service.configurationControllerReadAllResponse,
    readOne: this.service.configurationControllerReadOneResponse,
    update: this.service.configurationControllerUpdateResponse
  };

  protected model: Type<Model> = this.based(Model);

  public constructor(
    protected service: Service
  ) {
    super();
  }

  public create: (model: Partial<Model>) => Observable<any>;

  public update: (model: Partial<Model>) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<Model>;

  public readAll: (params?: Service.ConfigurationControllerReadAllParams) =>
    Observable<Model[]>;

}
