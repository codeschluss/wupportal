import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { Error } from 'app/models/error';
import { Constants } from './constants';


@Injectable()
export abstract class Service {

	constructor(
		protected http: HttpClient,
		protected messageBar: MatSnackBar
	) { }

	public httpPost(url: string, body: any, header: any, showSuccessMessage: boolean = false): Observable<any> {
		return this.http.post(url, JSON.stringify(body), {
			headers: header
		})
			.map(response => showSuccessMessage ? this.handleSuccess(response) : response)
			.catch(error => this.handleError(error));
	}

	public httpDelete(url: string, header: any): Observable<any> {
		return this.http.delete(url, {
			headers: header
		})
			.map(response => this.handleSuccess(response))
			.catch(error => this.handleError(error));
	}

	public httpPatch(url: string, body: any, header: any): Observable<any> {
		return this.http.patch(url, JSON.stringify(body), {
			headers: header
		})
			.map(response => this.handleSuccess(response))
			.catch(error => this.handleError(error));
	}

	public httpGet(url: string, header: any): Observable<any> {
		return this.http.get(url, {
			headers: header
		})
			.catch(error => this.handleError(error));
	}

	public handleSuccess(response: any): void {
		this.openMessageBar(Constants.successfulActionMessage, Constants.SHORT);
		return response;
	}

	protected handleError(responseError: HttpErrorResponse): Observable<Error> {
		const err: Error = this.createError(responseError);
		this.openMessageBar(err.message, err.messageDuration);
		return Observable.throw(err);
	}

	private createError(httpError: HttpErrorResponse): Error {
		switch (httpError.status) {
			case 401:
				return new Error(httpError, Constants.wrongCredentialsMessage, Constants.SHORT);
			case 404:
				return new Error(httpError, Constants.notFoundMessage, Constants.SHORT);
			case 409:
				return new Error(httpError, Constants.duplicateEntryMessage, Constants.MIDDLE);
			case 400:
				return new Error(httpError, Constants.wrongInputFormatMessage, Constants.MIDDLE);
			case 503:
				return new Error(httpError, Constants.serviceNotAvailable, Constants.MIDDLE);
			default:
				const errorMessage: string = Constants.unexpectedErrorMessage
					+ ' - ' + Constants.error + ': '
					+ JSON.stringify(httpError);
				return new Error(httpError, errorMessage, Constants.LONG);
		}
	}

	public openMessageBar(message: string, duration: number): void {
		this.messageBar.open(message, Constants.close, {
			duration: duration,
		});
	}

}
