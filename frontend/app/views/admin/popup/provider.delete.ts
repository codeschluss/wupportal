import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { ProviderService } from 'app/services/provider.service';
import { Constants } from 'app/services/constants';

@Component({
	templateUrl: 'provider.delete.html',
	providers: [ProviderService]
})

export class ProviderDeleteComponent {

	constructor(
		public constants: Constants,
		public dialogRef: MatDialogRef<ProviderDeleteComponent>,
		private service: ProviderService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onDelete(): void {
		this.service.delete(this.data.id).subscribe(() => this.dialogRef.close());
	}

	onCancel(): void {
		this.dialogRef.close();
	}
}


