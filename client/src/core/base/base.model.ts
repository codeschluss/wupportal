import { Type } from '@angular/core';
import { Link } from '../api/models/link';

export abstract class BaseModel {

  public id: string;

  public created: string;
  public modified: string;

  public _embedded?: object;
  public _links?: Link[];

}

export interface ModelLink {
  field: string;
  method: Function;
  model: Type<BaseModel>;
}
