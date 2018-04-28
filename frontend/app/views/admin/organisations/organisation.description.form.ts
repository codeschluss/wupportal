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
	selector: 'organisation-description',
	styleUrls: ['../../../app.component.css', '../admin.area.css'],
	templateUrl: 'organisation.description.form.html'
})

export class OrganisationDescriptionComponent implements OnInit {

	@Input() organisation: Organisation;

	translations: any[] = [];
	selectedLanguage: String;
	faCheck: IconDefinition = faCheck;
	faTimes: IconDefinition = faTimes;

	constructor(
		@Inject(TranslationService) private translationService: DataService,
		protected constants: Constants
	) { }

	ngOnInit(): void {
		this.initTranslations();
		this.selectedLanguage = this.constants.defaultCountryCode;
	}

	initTranslations(): void {
		this.translationService.getAll().subscribe(records => {
			this.translations = records;
			this.translations.push({ locale: this.constants.defaultCountryCode, name: this.constants.defaultLanguage });
			if (Object.keys(this.organisation._translations).length === 0 && this.organisation._translations.constructor === Object) {
				this.buildEmptyTranslations(records);
			}
		});
	}

	buildEmptyTranslations(records: any): void {
		records.map(translation => {
			const currLocale: any = { locale: translation.locale, description: '' };
			this.organisation._translations[translation.locale] = currLocale;
		});
	}

}

