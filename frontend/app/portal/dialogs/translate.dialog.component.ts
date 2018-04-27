// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// import { Activity } from 'app/models/activity';

// @Component({
// 	styles: [
// 		'mat-icon.fa { align-items: center; }',
// 		'mat-icon.fa { display: flex; }',
// 		'mat-icon.fa { justify-content: center; }'
// 	],
// 	template: `
// 		<mat-dialog-content>
// 			<mat-nav-list>
// 				<slot *ngFor="let language of languages">
// 					<a mat-list-item (click)="dialog.close(language)">
// 					</a>
// 					{{language.name}}
// 				</slot>
// 			</mat-nav-list>
// 		</mat-dialog-content>
// 	`
// })

// export class TranslateDialog {

// 	public constructor(
// 		@Inject(MAT_DIALOG_DATA)
// 		private languages: String[],

// 		private dialog: MatDialogRef<TranslateDialog>
// 	) { }

// }
