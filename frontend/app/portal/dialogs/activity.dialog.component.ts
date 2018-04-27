import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Activity } from 'app/models/activity';

@Component({
	// encapsulation: ViewEncapsulation.Native,
	styles: [
		'fa-icon { padding-right: 10px; }',
		'fa-icon::ng-deep path { stroke: black; stroke-width: 25px; }'
	],
	template: `
		<mat-dialog-content>
			<mat-nav-list>
				<slot *ngFor="let activity of activities">
					<a mat-list-item (click)="dialog.close(activity)">
						<span [style.color]="activity.category.color">
							<fa-icon icon="map-marker-alt"></fa-icon>
						</span>{{activity.name}}
					</a>
				</slot>
			</mat-nav-list>
		</mat-dialog-content>
	`
})

export class ActivityDialogComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA)
		private activities: Activity[],

		private dialog: MatDialogRef<ActivityDialogComponent>
	) { }

}
