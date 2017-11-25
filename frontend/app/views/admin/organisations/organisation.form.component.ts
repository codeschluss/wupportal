import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Organisation } from 'app/models/organisation';
import { OrganisationService } from 'app/services/organisation';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
	selector: 'edit-user',
	templateUrl: 'organisation.form.html',
})

export class OrganisationEditComponent implements OnInit {

	organisation$: Observable<Organisation>;

	constructor(
		public service: OrganisationService,
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
