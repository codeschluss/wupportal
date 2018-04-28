import { Component, Inject, Input, Output, SimpleChanges, OnInit } from '@angular/core';

import { TranslationService } from 'app/services/data.service.factory';
import { Organisation } from 'app/models/organisation';
import { DataService } from 'app/services/data.service';

import { Constants } from 'app/services/constants';
import { EventEmitter } from 'events';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';


@Component({
	selector: 'translatable-form',
	styleUrls: ['../../../app.component.css', '../admin.area.css'],
	templateUrl: 'translatable.form.html'
})

export class TranslatableFieldsComponent implements OnInit {

	@Input() multiLingualObject: {};

	translations: any[] = [];
	translatableAttributes: string[] = [];
	selectedLanguage: String;
	faCheck: IconDefinition = faCheck;
	faTimes: IconDefinition = faTimes;

	constructor(
		@Inject(TranslationService) private translationService: DataService,
		protected constants: Constants
	) { }

	ngOnInit(): void {
		this.initTranslations();
	}

	initTranslations(): void {
		this.translationService.getAll().subscribe(records => {
			this.translations = records;
			this.buildEmptyTranslations(records);
			this.initTranslatableFields();
			this.selectedLanguage = this.translations[0].locale;
		});
	}

	initTranslatableFields(): void {
		Object.keys(this.multiLingualObject['_translations'][this.translations[0].locale]).map(
			key => this.translatableAttributes.push(key)
		);
	}

	buildEmptyTranslations(records: any): void {
		records.map(translation => {
			if (!this.multiLingualObject['_translations'][translation.locale]
				|| (Object.keys(this.multiLingualObject['_translations'][translation.locale]).length === 0
					&& this.multiLingualObject['_translations'][translation.locale].constructor === Object)) {
				const currLocale: any = { locale: translation.locale, description: '' };
				this.multiLingualObject['_translations'][translation.locale] = currLocale;
			}
		});
	}

	getPlaceHolder(attribute: string): string {
		if (attribute === 'name') {
			attribute = 'nameString';
		}
		return this.constants[attribute] ? this.constants[attribute] : attribute;
	}

}

