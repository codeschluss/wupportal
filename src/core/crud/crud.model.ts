import { Link, ResourceObject } from '../tools/api';

export abstract class CrudModel
  implements ResourceObject {

  public id: string;

  public created: string;
  public modified: string;

  public name?: string;
  public language?: CrudModel;
  public translatables?: CrudModel[];
  public translations?: CrudModel[];

  public _embedded?: object;
  public _links?: Link[];

  public get label(): string | undefined {
    return this.name;
  }

  public constructor(...parts: (Partial<CrudModel> & Record<string, any>)[]) {
    Object.assign(this, ...parts);
  }

}
