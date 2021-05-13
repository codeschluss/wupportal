import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageControllerService as Service } from '../../api/services/language-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { LanguageModel as Model } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})

export class LanguageProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [];

  protected methods: CrudMethods = {
    create: this.service.languageControllerCreateResponse,
    delete: this.service.languageControllerDeleteResponse,
    readAll: this.service.languageControllerReadAllResponse,
    readOne: this.service.languageControllerReadOneResponse,
    update: this.service.languageControllerUpdateResponse
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

  public readAll: (params?: Service.LanguageControllerReadAllParams) =>
    Observable<Model[]>;

}
