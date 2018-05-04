import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Translation } from 'app/models/translation';

@Component({
	styles: [
		'h4[mat-dialog-title] { text-align: center }'
	],
	template: `
		<h4 mat-dialog-title>Sprache wählen</h4>
		<mat-dialog-content>
			<mat-nav-list>
				<ng-container *ngFor="let i of translations">
					<a mat-list-item (click)="dialog.close(i)">{{ i.name }}</a>
				</ng-container>
			</mat-nav-list>
		</mat-dialog-content>
	`
})

export class TranslationDialogComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public translations: Translation[],

		private dialog: MatDialogRef<TranslationDialogComponent>,
	) { }

}
