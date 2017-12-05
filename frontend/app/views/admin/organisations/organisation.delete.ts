import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { ProviderService } from 'app/services/provider.service';
import { Constants } from 'app/services/constants';
import { AuthenticationService } from 'app/services/authentication.service';
import { DataService } from 'app/services/data.service';

@Component({
	templateUrl: '../dialog/dialog.delete.html',
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient, AuthenticationService] }
	]
})

export class OrganisationDeleteComponent {

	constructor(
		public constants: Constants,
		public dialogRef: MatDialogRef<OrganisationDeleteComponent>,
		@Inject(OrganisationService) protected service: DataService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onDelete(): void {
		this.service.delete(this.data.id);
		this.dialogRef.close();
	}

	onCancel(): void {
		this.dialogRef.close();
	}
}


