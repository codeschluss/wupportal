import { Link } from '../api/models/link';
import { ProviderType } from './base.provider';

export type ModelType = new() => ({
  constructor: { prototype: BaseModel }
}) & BaseModel;

export abstract class BaseModel {

  public abstract provider: ProviderType;

  public id: string;

  public created: string;
  public modified: string;

  public _embedded?: object;
  public _links?: Link[];

}

export interface ModelLink {
  field: string;
  method: Function;
  model: ModelType;
  multi: boolean;
}
