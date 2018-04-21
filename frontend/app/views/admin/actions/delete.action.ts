import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Constants } from 'app/services/constants';
import { DeleteDialogComponent } from 'app/views/admin/dialog/delete.dialog';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

@Component({
	selector: 'delete-action',
	styleUrls: ['../../../app.component.css'],
	template: `
		<button mat-button type="button" (click)="openDialog()">
			<fa-icon [icon]="faTrash" class="text-danger"></fa-icon>
		</button>
	`
})

export class DeleteActionComponent {

	@Input() recordID: string;
	@Input() nameToDelete: string;
	@Output() onDelete: EventEmitter<string> = new EventEmitter<string>();
	faTrash: IconDefinition = faTrash;
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


