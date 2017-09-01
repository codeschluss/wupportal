import { Suburb } from './suburb';

export class Address {

	constructor(
		public id: string,
		public latitude: number,
		public longitude: number,
		public street: string,
		public houseNumber: string,
		public postalCode: string,
		public place: string,
		public suburb: Suburb,
	) {}

}
