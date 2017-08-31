import { Address } from './address';

export class User {

	constructor(
		public id: string,
		public admin: boolean,
		public username: string,
		public password: string,
		public fullname: string,
		public phone: string,
		public address: Address,
	) {};

}
