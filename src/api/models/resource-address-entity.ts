/* tslint:disable */
import { Link } from './link';
export interface ResourceAddressEntity {
  longitude?: number;
  _embedded?: {};
  created?: string;
  houseNumber?: string;
  id?: string;
  latitude?: number;
  _links?: Array<Link>;
  modified?: string;
  place?: string;
  postalCode?: string;
  street?: string;
  suburbId?: string;
}
