import { Link } from '../api/models/link';
import { ResourceObject } from '../api/models/resource-object';

export abstract class AbstractEntity implements ResourceObject {

  public id: string;

  public created: string;
  public modified: string;

  public _links?: Array<Link>;

}
