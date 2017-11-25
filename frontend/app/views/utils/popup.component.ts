import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrganisationService } from 'app/services/organisation';

@Component({
	templateUrl: 'popup.html',
})

export class DialogComponent {

	constructor(
		private service: OrganisationService,
		public dialogRef: MatDialogRef<DialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onDelete(): void {
		console.log('This entry is beeing deleted: ' + this.data.id);
		this.service.delete(this.data.id);
		this.dialogRef.close();
	}

	onCancel(): void {
		this.dialogRef.close();
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}


