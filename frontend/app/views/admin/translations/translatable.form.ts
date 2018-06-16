import { Component, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { TranslationService } from 'app/services/translation.service';
import { Constants } from 'app/services/constants';

@Component({
	selector: 'translatable-form',
	styleUrls: ['../../../app.component.css', '../admin.area.css'],
	templateUrl: 'translatable.form.html'
})

export class TranslatableFieldsComponent implements AfterViewInit {

	@Input() multiLingualObject: any = {};
	@Input() translatableAttributes: string[];
	@Input() disabled: boolean;
	@Output() translatedContents: any;

	translations: any[] = [];
	selectedLanguage: String;

	constructor(
		protected constants: Constants,
		private translationService: TranslationService
	) { }

	ngAfterViewInit(): void {
		this.translationService.getTranslatableLanguages().subscribe(languages => {
			this.translations = languages;
			this.selectedLanguage = languages[0].locale;
			this.translationService.initService(this.multiLingualObject, this.translatableAttributes, this.translations);
		});
	}

	init(multiLingualObject: any, translatableAttributes: any): void {
		this.multiLingualObject = multiLingualObject;
		this.translatableAttributes = translatableAttributes;
		this.translationService.getTranslatableLanguages().subscribe(languages => {
			this.translations = languages;
			this.selectedLanguage = languages[0].locale;
			this.translationService.initService(this.multiLingualObject, this.translatableAttributes, this.translations);
			this.saveTranslations();
		});
	}

	getPlaceHolder(attribute: string): string {
		if (attribute === 'name') {
			attribute = 'nameString';
		}
		return this.constants[attribute] ? this.constants[attribute] : attribute;
	}

	saveTranslations(): void {
		const translationsSubscriber = this.translationService.translateAll(this.multiLingualObject, this.translations);
		if (translationsSubscriber) {
			translationsSubscriber.subscribe(translationsRetrieved => {
				this.mergeTranslationAttributes(translationsRetrieved);
			});
		}
	}

	private mergeTranslationAttributes(translationsRetrieved: string): void {
		for (const languageCode of Object.keys(this.multiLingualObject._translations)) {
			if (!this.multiLingualObject._translations[languageCode]) {
				this.multiLingualObject._translations[languageCode] = translationsRetrieved[languageCode];
			} else {
				for (const attribute of Object.keys(this.multiLingualObject._translations[languageCode])) {
					if (!this.multiLingualObject._translations[languageCode][attribute]) {
						if (translationsRetrieved[languageCode][attribute]) {
							this.multiLingualObject._translations[languageCode][attribute] = translationsRetrieved[languageCode][attribute];
						}
					}
				}
			}
		}
	}

}


