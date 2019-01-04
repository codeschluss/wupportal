import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { TranslationControllerService } from '../../api/services/translation-controller.service';
import { TranslationModel } from './translation.model';

@Injectable({ providedIn: 'root' })
export class TranslationProvider
  extends CrudProvider<TranslationControllerService, TranslationModel> {

  protected linked: CrudLink[];

  protected methods: CrudMethods;

  protected model: Type<TranslationModel> = this.based(TranslationModel);

  public constructor(
    protected service: TranslationControllerService
  ) {
    super();
  }


}
