import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { Constants } from 'app/services/constants';
import { UserService } from 'app/services/user.service';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';


@Component({
	templateUrl: 'admin.html',
	styleUrls: ['../../app.component.css'],
})

export class AdminComponent implements OnInit {
	private routeLinks: any[] = [];
	private activeLinkIndex: number = 0;
	private faMap: IconDefinition = faMap;


	constructor(
		private location: Location,
		private router: Router,
		public constants: Constants,
		private userService: UserService
	) {
		this.initUserTabs();

		if (this.userService.isOrganisationAdmin()) {
			this.initOrganisationAdmin();
		}

		if (this.userService.isSuperUser()) {
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

	initOrganisationAdmin(): void {
		this.routeLinks.push({
			label: this.constants.organisationAdmin,
			link: ['/admin', { outlets: { table: ['organisation-admin', 'from-nav'] } }],
			index: 3
		});
	}

	initSuperUserTabs(): void {
		this.routeLinks.push({
			label: this.constants.userManagement,
			link: ['/admin', { outlets: { table: ['users'] } }],
			index: 4
		});
		this.routeLinks.push({
			label: this.constants.addressManagement,
			link: ['/admin', { outlets: { table: ['addresses'] } }],
			index: 5
		});
		this.routeLinks.push({
			label: this.constants.configuration,
			link: ['/admin', { outlets: { table: ['configurations'] } }],
			index: 6
		});
	}

	ngOnInit(): void {
		this.router.events.subscribe(() => {
			this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
		});
	}
}
