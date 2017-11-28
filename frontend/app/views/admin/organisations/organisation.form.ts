import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { Organisation } from 'app/models/organisation';

import { Constants } from 'app/views/common/constants';


@Component({
	selector: 'edit-organisation',
	templateUrl: 'organisation.form.html',
	styleUrls: ['../../../app.component.css'],
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient] }
	]
})

export class OrganisationFormComponent implements OnInit {

	organisation: Organisation;

	constructor(
		@Inject(OrganisationService) private service: DataService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants
	) { }

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.service.get(params.get('id'))).subscribe((data) => this.organisation = data.records);

	}

	onSubmit(): void {
		this.service.edit(this.organisation);
		this.location.back();
	}

	back(): void {
		this.location.back();
	}
}
