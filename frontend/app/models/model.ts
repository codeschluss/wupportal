export abstract class Model {

	public id: string = '';

	constructor(id: string = '') {
		this.id = id && id || '';
	}

}
