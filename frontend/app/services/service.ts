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
		this.openMessageBar('Aktion wurde erfolgreich ausgeführt');
		return response;
	}

	protected handleError(responseError: HttpErrorResponse): Observable<Error> {
		const err: Error = new Error(responseError.status, this.getErrorMessage(responseError), responseError);
		this.openMessageBar(err.message);
		return Observable.throw(err);
	}

	private getErrorMessage(error: HttpErrorResponse): string {
		switch (error.status) {
			case 401:
				return Constants.wrongCredentialsMessage;
			case 404:
				return Constants.notFoundMessage;
			case 409:
				return Constants.duplicateEntryMessage;
			case 400:
				return Constants.wrongInputFormatMessage;
			default:
				const errorString = JSON.stringify(error);
				return Constants.unexpectedErrorMessage + ' - Fehler: ' + errorString;
		}
	}

	public openMessageBar(message: string): void {
		this.messageBar.open(message, Constants.close, {
			duration: 9999999,
		});
	}

}
