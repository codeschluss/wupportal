/* tslint:disable */
import { Link } from './link';
export interface ResourceMarkupEntity {
  _embedded?: {};
  _links?: Array<Link>;
  content?: string;
  created?: string;
  id?: string;
  modified?: string;
  tagId?: string;
  title?: string;
}
