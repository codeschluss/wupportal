import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { ProviderService } from 'app/services/provider.service';
import { Constants } from 'app/services/constants';

@Component({
	template: `
	<div>{{data.message}}</div>
	<h3> {{data.name}} </h3>
	<button mat-raised-button color="warn"
  	(click)="onDelete()">{{constants.delete}}</button>
	<button mat-raised-button (click)="onCancel()">{{constants.cancel}}</button>`,
	providers: [ProviderService]
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


