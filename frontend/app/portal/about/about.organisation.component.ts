import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Organisation } from 'app/models/organisation';

@Component({
	styleUrls: ['about.component.css'],
	templateUrl: 'about.organisation.component.html',
})

export class AboutOrganisationComponent implements OnInit {

	@ViewChild('title')
	public title: ElementRef;

	public item: Organisation;

	constructor(
		private route: ActivatedRoute
	) { }

	public ngOnInit(): void {
		this.item = this.route.snapshot.data.organisation;
	}

}
