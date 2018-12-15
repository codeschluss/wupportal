import { Injectable } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { LanguageControllerService } from '../../api/services/language-controller.service';
import { LanguageModel } from './language.model';

@Injectable({ providedIn: 'root' })
export class LanguageProvider
  extends CrudProvider<LanguageControllerService, LanguageModel> {

  public create: (model: LanguageModel) => Observable<any>;

  public update: (id: string, model: LanguageModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<LanguageModel>;

  public readAll: (params?: LanguageControllerService
    .LanguageControllerReadAllParams) => Observable<LanguageModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.languageControllerCreateResponse,
    delete: this.service.languageControllerDeleteResponse,
    readAll: this.service.languageControllerReadAllResponse,
    readOne: this.service.languageControllerReadOneResponse,
    update: this.service.languageControllerUpdateResponse
  };

  protected model = this.based(LanguageModel);

  public constructor(
    protected service: LanguageControllerService
  ) {
    super();
  }

}
