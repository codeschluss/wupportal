import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	// TODO: If Admin show all, otherwise check if owner or other rights
	templateUrl: 'admin.html',
})

export class AdminComponent {
	constructor(
		private location: Location,
	) { }

	cancel(): void {
		this.location.back();
	}

}
