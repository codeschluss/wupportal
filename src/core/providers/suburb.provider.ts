import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { SuburbControllerService as Service } from '../../api/services/suburb-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { SuburbModel as Model } from '../models/suburb.model';

@Injectable({
  providedIn: 'root'
})

export class SuburbProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [];

  protected methods: CrudMethods = {
    create: this.service.suburbControllerCreateResponse,
    delete: this.service.suburbControllerDeleteResponse,
    readAll: this.service.suburbControllerReadAllResponse,
    readOne: this.service.suburbControllerReadOneResponse,
    update: this.service.suburbControllerUpdateResponse
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

  public readAll: (params?: Service.SuburbControllerReadAllParams) =>
    Observable<Model[]>;

}
