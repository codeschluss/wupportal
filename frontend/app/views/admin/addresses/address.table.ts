import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { DataSource } from '@angular/cdk/table';

import { DataServiceFactory, AddressService } from 'app/services/data.service.factory';
import { Address } from 'app/models/address';
import { AddressAutocompleteComponent } from 'app/views/admin/addresses/address.autocomplete';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { UserService } from 'app/services/user.service';
import { Constants } from 'app/services/constants';

import * as moment from 'moment';

@Component({
	selector: 'address-table',
	styleUrls: ['../table.abstract.css', '../../../app.component.css'],
	templateUrl: 'address.table.html'
})

export class AddressTableComponent extends AbstractTableComponent implements OnInit {

	@Input() providers: Array<string> = [];
	@Input() showActions: boolean = false;

	showNewButton: boolean = false;
	dataSource: MatTableDataSource<Address> = new MatTableDataSource<Address>();

	constructor(
		protected userService: UserService,
		@Inject(AddressService) public dataService: DataService,
		public constants: Constants) {
		super(dataService, constants);
	}

	initColumns(): void {
		this.displayedColumns = [
			'Addresses.street',
			'Addresses.house_number',
			'Addresses.postal_code',
			'Addresses.place',
			'Suburbs.name',
			'Addresses.latitude',
			'Addresses.longitude',
			'action'
		];
	}

}
