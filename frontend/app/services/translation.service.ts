import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Service } from 'app/services/service';
import { DataService } from 'app/services/data.service';
import { UserService } from 'app/services/user.service';


@Injectable()
export class TranslationService extends DataService {

	constructor(
		protected http: HttpClient,
		protected messageBar: MatSnackBar,
		protected userService: UserService) {
		super('translations', http, userService, messageBar);
	}

	public async translate(text: string, to: string): Promise<string> {
		return this.httpPost(
			this.baseUrl + 'translate',
			this.createBody(text, to),
			this.getHeader()
		).toPromise()
			.catch(e => this.handleError(e));
	}

	public createBody(text: string, to: string): any {
		return {
			'to': to,
			'text': text
		};
	}

}
