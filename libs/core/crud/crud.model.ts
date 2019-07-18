import { Link, ResourceObject } from '../utils/api';

export abstract class CrudModel implements ResourceObject {

  public id: string;

  public created: string;
  public modified: string;

  public language?: CrudModel;
  public translations?: CrudModel[];

  // tslint:disable: variable-name
  public _embedded?: object;
  public _links?: Link[];
  // tslint:enable: variable-name

}
