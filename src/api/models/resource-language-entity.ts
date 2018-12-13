/* tslint:disable */
import { Link } from './link';
export interface ResourceLanguageEntity {
  _embedded?: {};
  _links?: Array<Link>;
  created?: string;
  id?: string;
  locale?: string;
  machineTranslated?: string;
  modified?: string;
  name?: string;
}
