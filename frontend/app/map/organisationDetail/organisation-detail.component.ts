import { Component, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { Organisation } from '../../common/model/organisation';

@Component({
	selector: 'organisation-detail',
	templateUrl: 'organisation-detail.component.html'
})

export class OrganisationDetailComponent {

	public organisation = new Organisation();

	@Output()
	public back: EventEmitter<any> = new EventEmitter();

	public setOrganisation(clickedOrganisation: Organisation) {
		this.organisation = clickedOrganisation;
	}

	goBack() {
		this.back.emit();
	}

}
