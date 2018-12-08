import { CrudModel } from '@portal/core';
import { LanguageEntity } from 'src/api/models/language-entity';

export class LanguageModel
  extends CrudModel implements LanguageEntity {

  public locale: string;
  public machineTranslated: string;
  public name: string;

}
