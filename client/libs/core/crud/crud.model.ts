import { Link, ResourceObject } from '../utils/api';

export abstract class CrudModel implements ResourceObject {

  public id: string;

  public created: string;
  public modified: string;

  public _embedded?: object;
  public _links?: Link[];

}
