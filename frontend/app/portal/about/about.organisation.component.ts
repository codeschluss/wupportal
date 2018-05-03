import { Component } from '@angular/core';

import { Organisation } from 'app/models/organisation';

import { AboutComponent } from 'app/portal/about/about.component';

@Component({
	styleUrls: ['about.component.css'],
	templateUrl: 'about.organisation.component.html',
})

export class AboutOrganisationComponent extends AboutComponent {

	private item: Organisation;

	public ngOnInit(): void {
		this.item = this.route.snapshot.data.organisation;
	}

}
