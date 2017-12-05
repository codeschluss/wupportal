import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { Constants } from 'app/services/constants';

// TODO: If Admin show all, otherwise check if owner or other rights

@Component({
	templateUrl: 'admin.html',
})

export class AdminComponent implements OnInit {
	routeLinks: any[];
	activeLinkIndex: number = -1;

	constructor(
		private location: Location,
		private router: Router,
		public constants: Constants,
	) {
		this.routeLinks = [
			{
				label: constants.activities,
				link: ['/admin', { outlets: { table: ['activities'] } }],
				index: 0
			}, {
				label: constants.organisations,
				link: ['/admin', { outlets: { table: ['organisations'] } }],
				index: 1
			}, {
				label: constants.users,
				link: ['/admin', { outlets: { table: ['users'] } }],
				index: 2
			},
			{
				label: constants.account,
				link: ['/admin', { outlets: { table: ['account'] } }],
				index: 3
			},
		];
	}

	ngOnInit(): void {
		this.router.events.subscribe((res) => {
			this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
		});
	}

	cancel(): void {
		this.location.back();
	}
}
