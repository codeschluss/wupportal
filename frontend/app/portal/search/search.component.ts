import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { Activity } from 'app/models/activity';
import { Model } from 'app/models/model';

import { ActivityService } from 'app/services/activity.service';

import {
	SearchFilterComponent
} from 'app/portal/search/search.filter.component';

@Component({
	providers: [ActivityService],
	selector: 'search-component',
	styleUrls: ['search.component.css'],
	templateUrl: 'search.component.html'
})

export class SearchComponent implements OnInit, OnDestroy {

	@Input()
	public selectables: BehaviorSubject<Activity[]>;

	public filter: any;
	public input: string;

	public viewFilters: boolean;
	public viewLoading: boolean;
	public viewResults: boolean;

	private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

	constructor(
		@Inject(ActivityService)
		private activityService: ActivityService,

		private domSanitizer: DomSanitizer,
		private iconRegistry: MatIconRegistry
	) { }

	public ngOnInit(): void {
		this.filter = { };
		this.input = '';

		Object.defineProperty(this.filter, 'size', {
			get: (): number => Object.keys(this.filter)
				.map(i => this.filter[i].length).reduce((i, j) => i + j, 0)
		});

		this.iconRegistry.addSvgIcon('wuppertal', this.domSanitizer
			.bypassSecurityTrustResourceUrl('/imgs/wuppertal.svg'));
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe.next(null);
		this.ngUnsubscribe.complete();
	}

	public onInput(event: Event): void {
		this.input = (<HTMLInputElement> event.target).value;
	}

	public onFilter(event: [string, Model[]]): void {
		this.filter[event[0]] = event[1].map(i => i.id);
	}

	public onSearch(): void {
		const search = { };
		if (this.filter.size) { Object.assign(search, { advanced: this.filter }); }
		if (this.input.length) { Object.assign(search, { filter: this.input }); }

		this.viewLoading = true;
		this.selectables.next([]);

		this.activityService.getByMapfilter(search)
			.finally(() => this.viewLoading = false)
			.subscribe((activities: Activity[]) => {
				this.selectables.next(activities);
				this.viewResults = !!activities.length;
			});
	}

}
