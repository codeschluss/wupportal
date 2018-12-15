/* tslint:disable */
import { Link } from './link';
export interface ResourceBlogEntity {
  _embedded?: {};
  _links?: Array<Link>;
  author?: string;
  content?: string;
  created?: string;
  id?: string;
  likes?: number;
  modified?: string;
  title?: string;
}
