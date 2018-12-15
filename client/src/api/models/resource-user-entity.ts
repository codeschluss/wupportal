/* tslint:disable */
import { Link } from './link';
export interface ResourceUserEntity {
  _embedded?: {};
  _links?: Array<Link>;
  created?: string;
  id?: string;
  modified?: string;
  name?: string;
  organisationRegistrations?: Array<string>;
  phone?: string;
  superuser?: boolean;
  username?: string;
}
