import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MdCardModule } from '@angular/material';

import { Activity } from '../../common/model/activity';

@Component({
	selector: 'activity-summary',
	templateUrl: './activity-summary.component.html',
	styleUrls: ['./activity-summary.component.css']
})

export class ActivitySummaryComponent {
	@Input()
	public activity: Activity;

	@Output()
	public clicked: EventEmitter<Activity> = new EventEmitter();

	public maxTags = 3;

	onChipClick() {
		this.clicked.emit(this.activity);
	}
}
