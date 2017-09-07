import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Organisation } from '../../common/model/organisation';
import { OrgaService } from '../../services/organisation.service';
import { NominatimService } from '../../services/nominatim.service';

@Component({
	selector: 'edit-orgas',
	styleUrls: ['../table-basic.css'],
	templateUrl: './edit.organisations.component.html',
})

export class OrganisationsComponent implements OnInit {
	@ViewChild('filter') filter: ElementRef;

	public selectedOrga: Organisation;
	displayedColumns = ['id', 'name', 'description', 'mail', 'phone', 'website', 'image', 'street', 'housenumber', 'postalcode', 'place'];
	organisationsDatabase = this.organisationService.getOrganisationsDatabase();
	dataSource = this.organisationService.getOrganisationsDataSource();
	public addressOrgaInput: string;

	constructor(
		private organisationService: OrgaService,
		public nominatimService: NominatimService
	) { }


	ngOnInit() {
		this.dataSource = this.organisationService.getOrganisationsDataSource();
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
	}

	selectOrganisation(organisation: Organisation) {
		this.selectedOrga = organisation;
	}

	createOrganisation(): void {
		this.selectedOrga = new Organisation();
	}

	deselectOrganisation(): void {
		this.selectedOrga = null;
	}

	onSubmitOrganisation() {
		if (this.selectedOrga.id) {
			this.selectedOrga.address = this.nominatimService.getAddress(this.addressOrgaInput);
			this.organisationService.editOrganisation(this.selectedOrga);
			this.deselectOrganisation();
		} else {
			this.selectedOrga.address = this.nominatimService.getAddress(this.addressOrgaInput);
			this.organisationService.postOrganisation(this.selectedOrga);
			this.deselectOrganisation();
		}
	}

	deleteOrganisation() {
		this.organisationService.deleteOrganisation(this.selectedOrga);
		this.dataSource = this.organisationService.getOrganisationsDataSource();
		this.deselectOrganisation();
	}
}
