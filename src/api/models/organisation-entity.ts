/* tslint:disable */
import { VideoEntity } from './video-entity';
export interface OrganisationEntity {
  likes?: number;
  _embedded?: {};
  approved?: boolean;
  created?: string;
  description?: string;
  id?: string;
  addressId?: string;
  mail?: string;
  modified?: string;
  name?: string;
  phone?: string;
  videos?: Array<VideoEntity>;
  website?: string;
}
