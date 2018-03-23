export class Error {

	public status: number;
	public message: string;
	public error: any;

	constructor(status: number, message: string, error: any) {
		this.status = status;
		this.message = message;
		this.error = error;
	}
}
