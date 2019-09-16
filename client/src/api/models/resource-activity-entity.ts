/* tslint:disable */
import { Link } from './link';
export interface ResourceActivityEntity {
  description?: string;
  _embedded?: {};
  addressId?: string;
  categoryId?: string;
  contactName?: string;
  created?: string;
  _links?: Array<Link>;
  id?: string;
  mail?: string;
  modified?: string;
  name?: string;
  organisationId?: string;
  phone?: string;
}
