import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ProviderService } from 'app/services/provider.service';
import { Constants } from 'app/services/constants';

@Component({
	template: `
	<div>{{data.message}}</div>
	<h3> {{data.name}} </h3>
	<button mat-button color="warn"
  	(click)="onDelete()">{{constants.delete}}</button>
	<button mat-button (click)="onCancel()">{{constants.cancel}}</button>`,
	styleUrls: ['../../../app.component.css']
})

export class DeleteDialogComponent {

	constructor(
		public constants: Constants,
		public dialogRef: MatDialogRef<DeleteDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onDelete(): void {
		this.dialogRef.close(true);
	}

	onCancel(): void {
		this.dialogRef.close(false);
	}
}


