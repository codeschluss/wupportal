import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Error } from 'app/models/error';
import { Constants } from './constants';

@Injectable()
export abstract class Service {

	protected handleError(e: any): Observable<Error> {
		const err: Error = new Error(e.status, this.getErrorMessage(e.status), e);
		return Observable.throw(err);
	}

	private getErrorMessage(status: number): string {
		switch (status) {
			case 401:
				return Constants.wrongCredentialsMessage;
			case 404:
				return Constants.notFoundMessage;
			case 409:
				return Constants.duplicateEntryMessage;
			case 400:
				return Constants.wrongInputFormatMessage;
			default:
				return Constants.unexpectedErrorMessage;
		}
	}

}
