export class Error {

	public status: string;
	public message: string;
	public error: any;

	constructor(status: string, message: string, error: any) {
		this.status = status;
		this.message = message;
		this.error = error;
	}
}
