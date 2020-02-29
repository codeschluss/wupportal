/* tslint:disable */
import { Link } from './link';
import { VideoEntity } from './video-entity';
export interface ResourceOrganisationEntity {
  likes?: number;
  _embedded?: {};
  addressId?: string;
  approved?: boolean;
  created?: string;
  description?: string;
  id?: string;
  _links?: Array<Link>;
  mail?: string;
  modified?: string;
  name?: string;
  phone?: string;
  videos?: Array<VideoEntity>;
  website?: string;
}
