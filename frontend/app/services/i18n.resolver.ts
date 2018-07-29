import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Resolve } from '@angular/router';

import { Service } from 'app/services/service';
import { UserService } from 'app/services/user.service';

@Injectable()
export class I18nResolver extends Service implements Resolve<any> {

	public translation: string;

	constructor(
		protected http: HttpClient,
		protected messageBar: MatSnackBar,
		private user: UserService
	) {
		super(http, messageBar);
	}

	public async resolve(): Promise<string> {
		const url = `/i18n/strings.${this.user.getCurrentLanguage()}.xlf`;
		const req = this.http.get(url, { responseType: 'text' });
		return this.translation = await req.toPromise();
	}

}
