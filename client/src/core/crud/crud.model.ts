import { Link } from '../api/models/link';

export abstract class CrudModel {

  public id: string;

  public created: string;
  public modified: string;

  public _embedded?: object;
  public _links?: Link[];

}
