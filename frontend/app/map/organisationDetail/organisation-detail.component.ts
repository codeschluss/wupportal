import { Component, Input, ViewChild } from '@angular/core';

import { Activity } from '../../common/model/activity';

@Component({
	selector: 'organisation-detail',
	templateUrl: 'organisation-detail.component.html'
})

export class OrganisationDetailComponent {

	public activity = new Activity();

	setActivity(clickedActivity: Activity) {
		this.activity = clickedActivity;
	}
}
