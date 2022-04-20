/* tslint:disable */
import { Link } from './link';
export interface ResourceBlogEntity {
  _embedded?: {};
  _links?: Array<Link>;
  approved?: boolean;
  author?: string;
  content?: string;
  created?: string;
  id?: string;
  likes?: number;
  mailAddress?: string;
  modified?: string;
  title?: string;
  topicId?: string;
}
