import { Component, Inject, Input, Output, SimpleChanges, OnInit } from '@angular/core';

import { TranslationService } from 'app/services/data.service.factory';
import { Organisation } from 'app/models/organisation';
import { DataService } from 'app/services/data.service';

import { Constants } from 'app/services/constants';
import { EventEmitter } from 'events';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';
import { TranslationApiService } from '../../../services/translation.api.service';


@Component({
	selector: 'translatable-form',
	styleUrls: ['../../../app.component.css', '../admin.area.css'],
	templateUrl: 'translatable.form.html'
})

export class TranslatableFieldsComponent implements OnInit {

	@Input() multiLingualObject: {};
	@Input() translatableAttributes: string[];

	translations: any[] = [];
	selectedLanguage: String;
	faCheck: IconDefinition = faCheck;
	faTimes: IconDefinition = faTimes;

	constructor(
		@Inject(TranslationService) private translationService: DataService,
		private translationApiServcie: TranslationApiService,
		protected constants: Constants
	) { }

	ngOnInit(): void {
		if (Array.isArray(this.multiLingualObject['_translations'])) {
			this.multiLingualObject['_translations'] = {};
		}
		this.initTranslations();
	}

	initTranslations(): void {
		this.translationService.getAll().subscribe(records => {
			this.translations = records;
			this.selectedLanguage = this.translations[0].locale;
			this.buildEmptyTranslations(records);
		});
	}

	buildEmptyTranslations(records: any): void {
		records.map(translation => {
			const locale = translation.locale;
			if (!this.multiLingualObject['_translations']) {
				this.multiLingualObject['_translations'] = {};
			}
			if (!this.multiLingualObject['_translations'][locale]
				|| (Object.keys(this.multiLingualObject['_translations'][locale]).length === 0
					&& this.multiLingualObject['_translations'][locale].constructor === Object)) {
				const currLocale: any = {};
				currLocale.locale = locale;
				this.translatableAttributes.map(attribute => currLocale[attribute] = '');
				this.multiLingualObject['_translations'][locale] = currLocale;
			}
		});
	}

	getPlaceHolder(attribute: string): string {
		if (attribute === 'name') {
			attribute = 'nameString';
		}
		return this.constants[attribute] ? this.constants[attribute] : attribute;
	}

	getTranslations(): any {
		const _translations = {};
		Object.keys(this.multiLingualObject['_translations']).forEach(languageCode => {
			Object.keys(this.multiLingualObject['_translations'][languageCode]).forEach(attribute => {
				if (attribute !== 'locale') {
					if (!this.multiLingualObject['_translations'][languageCode][attribute]) {
						console.log(this.multiLingualObject[attribute] + ': ' + languageCode);
						this.multiLingualObject['_translations'][languageCode][attribute] = this.multiLingualObject[attribute] + ': ' + languageCode;
						// this.translationApiServcie.getTranslation(this.multiLingualObject[attribute], languageCode).subscribe(translation => {
						// 	this.multiLingualObject['_translations'][languageCode][attribute] = translation;
						// });
					}
				}
			});
		});
		return this.multiLingualObject['_translations'];
	}

}


