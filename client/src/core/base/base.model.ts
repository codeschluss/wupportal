import { Link } from '../api/models/link';

export type ModelType = new() => ({ constructor: { prototype: BaseModel } });

export abstract class BaseModel {

  public id: string;

  public created: string;
  public modified: string;

  public _embedded?: object;
  public _links?: Link[];

}
