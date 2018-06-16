import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { DataService } from 'app/services/data.service';
import { UserService } from 'app/services/user.service';
import { TranslationRequest } from 'app/models/translation.all.request';


@Injectable()
export class TranslationService extends DataService {

	constructor(
		protected http: HttpClient,
		protected messageBar: MatSnackBar,
		protected userService: UserService,
	) {
		super('translations', http, userService, messageBar);
	}

	public translate(text: string, to: string): Observable<string> {
		return this.httpPost(
			this.baseUrl + 'translate',
			this.createBody(text, to),
			this.getHeader()
		);
	}

	public createBody(text: string, to: string): any {
		return {
			'to': to,
			'text': text
		};
	}

	public getTranslatableLanguages(): Observable<any[]> {
		return this.getAll();
	}

	public translateAll(multilingualObject: any, translations: any[]): Observable<string> {
		const request = this.buildTranslationRequest(multilingualObject, translations);
		if (request) {
			return this.httpPost(
				this.baseUrl + 'translateAll',
				request,
				this.getHeader()
			);
		}
	}

	initService(multiLingualObject: any, translatableAttributes: string[], translations: any[]): any {
		multiLingualObject._translations = this.buildEmptyTranslations(multiLingualObject, translatableAttributes, translations);
		return multiLingualObject;
	}

	public buildTranslationRequest(multiLingualObject: any, translations: any[]): TranslationRequest {
		const languagesToTranslate: string[] = [];
		const propertiesToTransLate: Map<string, string> = new Map<string, string>();
		for (const language of translations) {
			const languageCode = language.locale;
			if (!multiLingualObject['_translations'][languageCode]) {
				languagesToTranslate.push(languageCode);
			} else {
				for (const attribute of Object.keys(multiLingualObject['_translations'][languageCode])) {
					if (attribute !== 'locale') {
						if (!multiLingualObject['_translations'][languageCode][attribute]) {
							languagesToTranslate.push(languageCode);
							propertiesToTransLate[attribute] = multiLingualObject[attribute];
						}
					}
				}
			}
		}
		if (languagesToTranslate.length) {
			const translationsRequest: TranslationRequest =
				new TranslationRequest(propertiesToTransLate, Array.from(new Set(languagesToTranslate)));
			return translationsRequest;
		} else {
			return null;
		}
	}

	buildEmptyTranslations(multiLingualObject: any, translatableAttributes: string[], translations: any[]): any {
		translations.map(translation => {
			const locale = translation.locale;
			if (!multiLingualObject['_translations'] || Array.isArray(multiLingualObject._translations)) {
				multiLingualObject['_translations'] = {};
			}
			if (!multiLingualObject['_translations'][locale]
				|| (Object.keys(multiLingualObject['_translations'][locale]).length === 0
					&& multiLingualObject['_translations'][locale].constructor === Object)) {
				const currLocale: any = {};
				currLocale.locale = locale;
				translatableAttributes.map(attribute => currLocale[attribute] = '');
				multiLingualObject['_translations'][locale] = currLocale;
			}
		});
		return multiLingualObject['_translations'];
	}

}
