import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataServiceFactory, SuburbService } from 'app/services/data.service.factory';
import { Suburb } from 'app/models/suburb';
import { DataService } from 'app/services/data.service';

@Component({
	templateUrl: 'popup.suburb.html',
	providers: [
		{ provide: SuburbService, useFactory: DataServiceFactory(SuburbService), deps: [HttpClient] }
	]
})

export class SuburbSelectionComponent {
	suburbs: Suburb[];
	suburb: Suburb;

	constructor(
		@Inject(SuburbService) private service: DataService,
		public dialogRef: MatDialogRef<SuburbSelectionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.service.getAll().subscribe((response) => this.suburbs = response.records);
	}

	onNoClick(): void { }

	onSubmit(): void {
		this.data.address.suburb_id = this.suburb.id;
		this.dialogRef.close();
	}
}


