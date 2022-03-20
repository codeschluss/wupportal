import { VisitableEntityObject } from '../../api/models/visitable-entity-object';
import { CrudModel } from '../crud/crud.model';

export class VisitableModel
  extends CrudModel
  implements VisitableEntityObject {

    visits: number;
}