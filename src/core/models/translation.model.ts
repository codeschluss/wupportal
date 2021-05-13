import { TranslationResult } from '../../api/models/translation-result';

export class TranslationModel
  implements TranslationResult {

  public lang?: string;
  public translations?: Record<string, string>;

}
