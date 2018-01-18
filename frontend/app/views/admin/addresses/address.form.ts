import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationService } from 'app/services/validation.service';

import { Address } from 'app/models/address';
import { Constants } from 'app/services/constants';


@Component({
	templateUrl: 'address.form.html',
})

export class AddressFormComponent {

	address: Address;

	constructor(
		public constants: Constants,
		public dialogRef: MatDialogRef<AddressFormComponent>,
		public validation: ValidationService,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		this.address = new Address();
	}

	onNoClick(): void { }

	onSubmit(): void {
		this.dialogRef.close(this.address);
	}
}


