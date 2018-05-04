import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Activity } from 'app/models/activity';

@Component({
	styles: [
		'fa-icon { padding-right: 10px; }',
		'fa-icon::ng-deep path { stroke: black; stroke-width: 24px; }',
		'h4[mat-dialog-title] { text-align: center }'
	],
	template: `
		<h4 mat-dialog-title>Aktivität wählen</h4>
		<mat-divider></mat-divider>
		<mat-dialog-content>
			<mat-nav-list>
				<ng-container *ngFor="let i of activities">
					<a mat-list-item (click)="dialog.close(i)">
						<fa-icon icon="map-marker-alt" [style.color]="i.category.color">
						</fa-icon>{{ i.name }}
					</a>
				</ng-container>
			</mat-nav-list>
		</mat-dialog-content>
	`
})

export class ActivityDialogComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public activities: Activity[],

		private dialog: MatDialogRef<ActivityDialogComponent>
	) { }

}
