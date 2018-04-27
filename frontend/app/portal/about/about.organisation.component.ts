import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Constants } from 'app/services/constants';

import { Organisation } from 'app/models/organisation';

@Component({
	selector: 'about-organisation',
	styleUrls: ['about.component.css'],
	templateUrl: 'about.organisation.component.html',
})

export class AboutOrganisationComponent implements OnChanges {

	@Input() organisation: Organisation;

	constructor(
		public constants: Constants
	) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.organisation)
			this.organisation = changes.organisation.currentValue;
	}

}
