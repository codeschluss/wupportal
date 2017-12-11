export abstract class Model {

	public id: string = '';
	public created: Date = new Date(Date.now());
	public modified: Date = new Date(Date.now());

	constructor(id: string = '') {
		this.id = id && id || '';
		this.created = new Date(Date.now());
		this.modified = new Date(Date.now());
	}

}
