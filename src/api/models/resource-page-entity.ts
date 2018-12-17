/* tslint:disable */
import { Link } from './link';
export interface ResourcePageEntity {
  _embedded?: {};
  _links?: Array<Link>;
  content?: string;
  created?: string;
  id?: string;
  modified?: string;
  title?: string;
  topicId?: string;
}
