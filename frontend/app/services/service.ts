import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { Error } from 'app/models/error';
import { Constants } from './constants';


@Injectable()
export abstract class Service {

	constructor(protected messageBar: MatSnackBar) { }

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
