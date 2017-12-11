import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Constants } from 'app/services/constants';
import { DeleteDialogComponent } from 'app/views/admin/dialog/delete.dialog';

@Component({
	selector: 'delete-action',
	template: `
		<button mat-button color="warn" type="button"
			(click)="openDialog()">
			<i class="fa fa-trash-o" aria-hidden="true"></i>
		</button>
	`
})

export class DeleteActionComponent {

	@Input() recordID: string;
	@Input() nameToDelete: string;
	@Output() onDelete: EventEmitter<string> = new EventEmitter<string>();

	constructor(
		public constants: Constants,
		public deleteDialog: MatDialog) {
	}

	openDialog(): void {
		const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
			width: '250px',
			data: {
				name: this.nameToDelete,
				message: this.constants.deleteMessage,
				id: this.recordID
			}
		});

		dialogRef.afterClosed().subscribe(deleted => {
			if (deleted) {
				this.onDelete.emit(this.recordID);
			}
		});
	}
}


