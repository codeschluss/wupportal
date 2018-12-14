/* tslint:disable */
import { Link } from './link';
export interface ResourceOrganisationEntity {
  mail?: string;
  _embedded?: {};
  approved?: boolean;
  created?: string;
  description?: string;
  id?: string;
  _links?: Array<Link>;
  modified?: string;
  name?: string;
  phone?: string;
  videoUrl?: string;
  website?: string;
}
