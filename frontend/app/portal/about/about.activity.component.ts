import { Component } from '@angular/core';

import { Activity } from 'app/models/activity';

import { AboutComponent } from 'app/portal/about/about.component';

@Component({
	styleUrls: ['about.component.css'],
	templateUrl: 'about.activity.component.html'
})

export class AboutActivityComponent extends AboutComponent {

	private item: Activity;

	public ngOnInit(): void {
		this.item = this.route.snapshot.data.activity;
	}

}
