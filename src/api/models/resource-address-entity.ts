/* tslint:disable */
import { Link } from './link';
export interface ResourceAddressEntity {
  latitude?: number;
  _embedded?: {};
  created?: string;
  houseNumber?: string;
  id?: string;
  _links?: Array<Link>;
  longitude?: number;
  modified?: string;
  place?: string;
  postalCode?: string;
  street?: string;
}
