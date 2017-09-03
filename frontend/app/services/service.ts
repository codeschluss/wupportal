import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Service {

	protected baseURL = '/';
	protected headers = new Headers({ 'Accept': 'application/json' });

	constructor(protected http: Http) { }

	// TODO: Only for prototyping
	protected handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		console.log(error.json());
		return Promise.reject(error.message || error);
	}

}
