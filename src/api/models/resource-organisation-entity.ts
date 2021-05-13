/* tslint:disable */
import { Link } from './link';
export interface ResourceOrganisationEntity {
  _embedded?: {};
  _links?: Array<Link>;
  addressId?: string;
  approved?: boolean;
  created?: string;
  description?: string;
  id?: string;
  likes?: number;
  mail?: string;
  modified?: string;
  name?: string;
  phone?: string;
  website?: string;
}
