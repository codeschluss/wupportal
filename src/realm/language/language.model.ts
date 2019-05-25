import { CrudModel } from '@wooportal/core';
import { LanguageEntity } from '../../api/models/language-entity';

export class LanguageModel
  extends CrudModel implements LanguageEntity {

  public locale: string;
  public machineTranslated: string;
  public name: string;

}
