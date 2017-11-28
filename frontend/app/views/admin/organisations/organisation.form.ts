import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { Organisation } from 'app/models/organisation';

import { Constants } from 'app/views/common/constants';


@Component({
	selector: 'edit-organisation',
	templateUrl: 'organisation.form.html',
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient] }
	]
})

export class OrganisationFormComponent implements OnInit {

	organisation$: Observable<Organisation[]>;

	constructor(
		@Inject(OrganisationService) private service: DataService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants
	) { }

	ngOnInit(): void {
		this.organisation$ = this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.service.get(params.get('id')));
	}

	console(orga: any): void {
		console.log('orga: ', orga);
	}

	back(): void {
		this.location.back();
	}

}
