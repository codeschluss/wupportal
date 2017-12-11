import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { Constants } from 'app/services/constants';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
	templateUrl: 'admin.html',
})

export class AdminComponent implements OnInit {
	routeLinks: any[] = [];
	activeLinkIndex: number = -1;

	constructor(
		private location: Location,
		private router: Router,
		public constants: Constants,
		private authService: AuthenticationService
	) {
		this.initUserTabs();

		// // TODO: Make seperate tab for organisation edit view
		// if (this.authService.isOrganisationAdmin()) {
		// 	this.initOrganisationAdmin();
		// }

		if (this.authService.isSuperUser()) {
			this.initSuperUserTabs();
		}
	}

	initUserTabs(): void {
		this.routeLinks.push({
			label: this.constants.activities,
			link: ['/admin', { outlets: { table: ['activities'] } }],
			index: 0
		});
		this.routeLinks.push({
			label: this.constants.organisations,
			link: ['/admin', { outlets: { table: ['organisations'] } }],
			index: 1
		});
		this.routeLinks.push({
			label: this.constants.account,
			link: ['/admin', { outlets: { table: ['account'] } }],
			index: 2
		});
	}

	initSuperUserTabs(): void {
		this.routeLinks.push({
			label: this.constants.account,
			link: ['/admin', { outlets: { table: ['users'] } }],
			index: 3
		});

		// TODO: Configuration view
	}

	ngOnInit(): void {
		this.router.events.subscribe((res) => {
			this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
		});
	}
}
