import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Activity } from '../../models/activity';
import { Organisation } from '../../models/organisation';

@Component({
	selector: 'activity-detail',
	templateUrl: 'activity-detail.component.html',
	styleUrls: ['activity-detail.component.css']
})

export class ActivityDetailComponent {

	@Output()
	public clickOrganisation: EventEmitter<Organisation> = new EventEmitter();

	public activity = new Activity();

	setActivity(clickedActivity: Activity) {
		this.activity = clickedActivity;
	}

	onSelectOrganisation() {
		this.clickOrganisation.emit(this.activity.provider.organisation);
	}
}
