/* tslint:disable */
import { Link } from './link';
export interface ResourceUserEntity {
  _embedded?: {};
  _links?: Array<Link>;
  created?: string;
  fullname?: string;
  id?: string;
  modified?: string;
  phone?: string;
  superuser?: boolean;
  username?: string;
}
