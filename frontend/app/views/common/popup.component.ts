import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';

@Component({
	templateUrl: 'popup.html',
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient] }
	]
})

export class DialogComponent {

	constructor(
		@Inject(OrganisationService) private service: DataService,
		public dialogRef: MatDialogRef<DialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onDelete(): void {
		console.log('This entry is beeing deleted: ' + this.data.id);
		this.service.delete(this.data.id);
		this.dialogRef.close();
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}


