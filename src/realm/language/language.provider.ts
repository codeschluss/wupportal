import { Injectable } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { LanguageControllerService } from '../../api/services/language-controller.service';
import { LanguageModel } from './language.model';

@Injectable({ providedIn: 'root' })
export class LanguageProvider
  extends CrudProvider<LanguageControllerService, LanguageModel> {

  public create: (model: LanguageModel) => Promise<any>;

  public update: (id: string, model: LanguageModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public readOne: (id: string) => Promise<LanguageModel>;

  public readAll: (params?: LanguageControllerService
    .LanguageControllerReadAllParams) => Promise<LanguageModel[]>;

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
