import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import { Activity } from 'app/models/activity';

import { Constants } from 'app/services/constants';

@Component({
	selector: 'about-activity',
	styleUrls: ['about.component.css'],
	templateUrl: 'about.activity.component.html'
})

export class AboutActivityComponent implements OnInit, OnDestroy {

	private readonly ngUnsubscribe: Subject<null> = new Subject();

	constructor(
		public route:  ActivatedRoute
	) { }

	public ngOnInit(): void {
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

}
