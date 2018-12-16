import { CrudModel } from '@portal/core';
import { TranslationResult } from '../../api/models/translation-result';

export class TranslationModel
  extends CrudModel implements TranslationResult {

  public lang: string;
  public translations: { [key: string]: string };

}
