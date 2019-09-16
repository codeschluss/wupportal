/* tslint:disable */
import { Link } from './link';
export interface ResourceOrganisationEntity {
  id?: string;
  _embedded?: {};
  addressId?: string;
  approved?: boolean;
  created?: string;
  description?: string;
  _links?: Array<Link>;
  mail?: string;
  modified?: string;
  name?: string;
  phone?: string;
  videoUrl?: string;
  website?: string;
}
