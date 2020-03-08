import { CrudModel } from '@wooportal/core';

export class BloggerModel
  extends CrudModel {

  public approved: boolean;
  public author: string;

  public get name(): string {
    return this.author;
  }

}
