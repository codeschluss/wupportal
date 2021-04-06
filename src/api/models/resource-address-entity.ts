/* tslint:disable */
import { Link } from './link';
export interface ResourceAddressEntity {
  _embedded?: {};
  _links?: Array<Link>;
  created?: string;
  houseNumber?: string;
  id?: string;
  latitude?: number;
  longitude?: number;
  modified?: string;
  place?: string;
  postalCode?: string;
  street?: string;
  suburbId?: string;
}
