/* tslint:disable */
import { Link } from './link';
export interface ResourceActivityEntity {
  id?: string;
  _embedded?: {};
  addressId?: string;
  categoryId?: string;
  contactName?: string;
  created?: string;
  description?: string;
  _links?: Array<Link>;
  likes?: number;
  mail?: string;
  modified?: string;
  name?: string;
  organisationId?: string;
  phone?: string;
}
