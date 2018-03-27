export class Error {

	public message: string;
	public error: any;
	public messageDuration: number;

	constructor(error: any = {}, message: string = '', messageDuration: number = 0) {
		this.message = message;
		this.error = error;
		this.messageDuration = messageDuration;
	}
}
