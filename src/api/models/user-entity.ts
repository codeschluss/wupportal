/* tslint:disable */
export interface UserEntity {
  name?: string;
  _embedded?: {};
  created?: string;
  id?: string;
  modified?: string;
  applyBlogger?: boolean;
  organisationRegistrations?: Array<string>;
  password?: string;
  phone?: string;
  superuser?: boolean;
  username?: string;
}
