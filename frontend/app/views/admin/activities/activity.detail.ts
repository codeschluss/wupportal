import { Component, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';

import { Activity } from 'app/models/activity';
import { Constants } from 'app/services/constants';


@Component({
	selector: 'activity-detail',
	templateUrl: 'activity.detail.html',
	styleUrls: ['../../../app.component.css']
})

export class ActivityDetailComponent implements OnChanges {

	@Input() activity: Activity;

	constructor(
		public constants: Constants
	) { }

	ngOnChanges(changes: SimpleChanges): void {
		const activity: SimpleChange = changes.activity;
		this.activity = activity.currentValue;
	}

}
