/* tslint:disable */
import { Link } from './link';
export interface ResourceUserEntity {
  modified?: string;
  _embedded?: {};
  applyBlogger?: boolean;
  created?: string;
  id?: string;
  _links?: Array<Link>;
  name?: string;
  organisationRegistrations?: Array<string>;
  phone?: string;
  superuser?: boolean;
  username?: string;
}
