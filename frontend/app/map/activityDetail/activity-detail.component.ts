import { Component, Input, ViewChild } from '@angular/core';

import { Activity } from '../../common/model/activity';

@Component({
	selector: 'activity-detail',
	templateUrl: 'activity-detail.component.html'
})

export class ActivityDetailComponent {

	public activity = new Activity();

	setActivity(clickedActivity: Activity) {
		this.activity = clickedActivity;
	}
}
