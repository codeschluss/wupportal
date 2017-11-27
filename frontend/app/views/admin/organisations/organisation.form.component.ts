import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { Organisation } from 'app/models/organisation';

@Component({
	selector: 'edit-user',
	templateUrl: 'organisation.form.html',
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient] }
	]
})

export class OrganisationEditComponent implements OnInit {

	organisation$: Observable<Organisation>;

	constructor(
		@Inject(OrganisationService) private service: DataService,
		private location: Location,
		public route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.organisation$ = this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.service.get(params.get('id')));
	}

	back(): void {
		this.location.back();
	}

}
