import { LanguageEntity } from '../../api/models/language-entity';
import { CrudModel } from '../crud/crud.model';

export class LanguageModel
  extends CrudModel
  implements LanguageEntity {

  public locale: string;
  public name: string;

}
