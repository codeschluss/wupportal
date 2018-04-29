import { Component, OnChanges, Input, SimpleChange, SimpleChanges, } from '@angular/core';

import { Activity } from 'app/models/activity';
import { User } from 'app/models/user';
import { Constants } from 'app/services/constants';

import { DataServiceFactory } from 'app/services/data.service.factory';
import { DataService } from '../../../services/data.service';

@Component({
	selector: 'activity-detail',
	templateUrl: 'activity.detail.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class ActivityDetailComponent implements OnChanges {

	@Input() activity: Activity;
	private translations: any[];

	constructor(
		public constants: Constants
	) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.activity) {
			const activity: SimpleChange = changes.activity;
			this.activity = activity.currentValue;
		}
	}

}
