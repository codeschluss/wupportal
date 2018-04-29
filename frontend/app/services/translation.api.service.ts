import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Service } from './service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class TranslationApiService extends Service {

	subscriptionKey: string = 'ENTER KEY HERE';
	url: string = 'api.microsofttranslator.com/V2/Http.svc/Translate';

	constructor(
		protected http: HttpClient,
		protected messagebar: MatSnackBar) {
		super(http, messagebar);
	}

	public getTranslation(text: string, targetLanguage: string): Observable<any> {
		return this.httpGet(
			this.generateURL(text, targetLanguage),
			this.getHeader()
		);
	}

	generateURL(text: string, target: string): string {
		return this.url + '?to=' + target + '&text=' + encodeURI(text);
	}

	getHeader(): any {
		return new HttpHeaders()
			.set('Ocp-Apim-Subscription-Key', this.subscriptionKey);
	}

}
