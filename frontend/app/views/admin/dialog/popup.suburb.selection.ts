import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataServiceFactory, SuburbService } from 'app/services/data.service.factory';
import { Suburb } from 'app/models/suburb';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';


@Component({
	templateUrl: 'popup.suburb.html'
})

export class SuburbSelectionComponent {
	suburbs: Suburb[];
	suburb: Suburb;

	constructor(
		protected constants: Constants,
		@Inject(SuburbService) private service: DataService,
		public dialogRef: MatDialogRef<SuburbSelectionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		if (data.address && data.address.suburb) {
			this.suburb = data.address.suburb;
		}
		this.service.getAll().subscribe((response) => this.suburbs = response);
	}

	onSubmit(): void {
		this.dialogRef.close(this.suburb);
	}
}


