/* tslint:disable */
import { Link } from './link';
import { OrganisationImageEntity } from './organisation-image-entity';
export interface ResourceOrganisationEntity {
  mail?: string;
  _links?: Array<Link>;
  description?: string;
  id?: string;
  images?: Array<OrganisationImageEntity>;
  created?: string;
  modified?: string;
  name?: string;
  phone?: string;
  videoUrl?: string;
  website?: string;
}
