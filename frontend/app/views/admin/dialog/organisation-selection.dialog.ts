
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Constants } from 'app/services/constants';

@Component({
	templateUrl: 'organisation-selection.dialog.html',
	styleUrls: ['../../../app.component.css']
})
export class OrganisationSelectionComponent {

	public selectedOrgaID: string;

	constructor(
		public constants: Constants,
		public dialogRef: MatDialogRef<OrganisationSelectionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onSelect(): void {
		this.dialogRef.close(this.selectedOrgaID);
	}

	onCancel(): void {
		this.dialogRef.close();
	}

}
