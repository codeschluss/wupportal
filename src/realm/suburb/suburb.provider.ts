import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { SuburbControllerService } from '../../api/services/suburb-controller.service';
import { SuburbModel } from './suburb.model';

@Injectable({ providedIn: 'root' })
export class SuburbProvider
  extends CrudProvider<SuburbControllerService, SuburbModel> {

  public create: (model: SuburbModel) => Observable<any>;

  public update: (model: SuburbModel, id: string) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<SuburbModel>;

  public readAll: (params?: SuburbControllerService
    .SuburbControllerReadAllParams) => Observable<SuburbModel[]>;

  protected linked: CrudLink[] = [];

  protected methods: CrudMethods = {
    create: this.service.suburbControllerCreateResponse,
    delete: this.service.suburbControllerDeleteResponse,
    readAll: this.service.suburbControllerReadAllResponse,
    readOne: this.service.suburbControllerReadOneResponse,
    update: this.service.suburbControllerUpdateResponse
  };

  protected model: Type<SuburbModel> = this.based(SuburbModel);

  public constructor(
    protected service: SuburbControllerService
  ) {
    super();
  }

}
