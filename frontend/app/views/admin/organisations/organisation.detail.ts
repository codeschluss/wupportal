import { Component, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';

import { Constants } from 'app/services/constants';
import { Organisation } from 'app/models/organisation';
import { DataService } from '../../../services/data.service';


@Component({
	selector: 'organisation-detail',
	templateUrl: 'organisation.detail.html',
	styleUrls: ['organisation.css', '../admin.area.css', '../../../app.component.css']
})

export class OrganisationDetailComponent implements OnChanges {

	@Input() organisation: Organisation;
	@Input() largeTitle: Boolean;

	constructor(
		public constants: Constants
	) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.organisation) {
			const organisation: SimpleChange = changes.organisation;
			this.organisation = organisation.currentValue;
		}
	}

}
