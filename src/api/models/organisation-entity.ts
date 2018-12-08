/* tslint:disable */
import { OrganisationImageEntity } from './organisation-image-entity';
export interface OrganisationEntity {
  created?: string;
  description?: string;
  id?: string;
  images?: Array<OrganisationImageEntity>;
  mail?: string;
  modified?: string;
  name?: string;
  phone?: string;
  videoUrl?: string;
  website?: string;
}
