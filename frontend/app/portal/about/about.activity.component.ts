import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { Activity } from 'app/models/activity';

@Component({
	styleUrls: ['about.component.css'],
	templateUrl: 'about.activity.component.html'
})

export class AboutActivityComponent implements OnInit {

	@ViewChild('header')
	public header: ElementRef;

	public item: Activity;
	public viewSchedules: boolean;

	constructor(
		private route: ActivatedRoute
	) { }

	public ngOnInit(): void {
		this.item = this.route.snapshot.data.activity;
	}

}
