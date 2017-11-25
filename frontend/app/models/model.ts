export abstract class Model {

	public id: string = '';
	public created: Date = new Date(Date.now());
	public modified: Date = new Date(Date.now());

	public static getRepository(): string {
		return '';
	}

}
