import { Component, Input } from '@angular/core';
import { MdCardModule } from '@angular/material';

import { Activity } from '../../common/model/activity';

@Component({
	selector: 'activity-summary',
	templateUrl: './activity-summary.component.html',
	styleUrls: ['./activity-summary.component.css']
})

export class ActivitySummaryComponent {
	@Input() activity: Activity;
}
