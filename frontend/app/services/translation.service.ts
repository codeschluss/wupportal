import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Service } from 'app/services/service';
import { DataService } from 'app/services/data.service';
import { UserService } from 'app/services/user.service';
import { TranslationRequest } from 'app/models/translation.all.request';


@Injectable()
export class TranslationService extends DataService {

	constructor(
		protected http: HttpClient,
		protected messageBar: MatSnackBar,
		protected userService: UserService) {
		super('translations', http, userService, messageBar);
	}

	public translate(text: string, to: string): Observable<string> {
		return this.httpPost(
			this.baseUrl + 'translate',
			this.createBody(text, to),
			this.getHeader()
		);
	}

	public translateAll(request: TranslationRequest): Observable<string> {
		return this.httpPost(
			this.baseUrl + 'translateAll',
			request,
			this.getHeader()
		);
	}

	public createBody(text: string, to: string): any {
		return {
			'to': to,
			'text': text
		};
	}

}
