import {
	Component,
	OnInit,
	OnDestroy,
	ViewChild,
	AfterViewInit,
	ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Activity } from 'app/models/activity';
import { Organisation } from 'app/models/organisation';

import {
	AboutActivityComponent
} from 'app/portal/about/about.activity.component';
import {
	AboutOrganisationComponent
} from 'app/portal/about/about.organisation.component';
import { MappingComponent } from 'app/portal/mapping/mapping.component';
import { SearchComponent } from 'app/portal/search/search.component';

@Component({
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['portal.component.css'],
	templateUrl: 'portal.component.html',
})

export class PortalComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('mapping-component')
	private mappingComponent: MappingComponent;

	@ViewChild('search-component')
	private searchComponent: SearchComponent;

	private landscape: Observable<boolean>;
	private selectables: BehaviorSubject<Activity[]>;

	private readonly ngUnsubscribe: Subject<null> = new Subject();

	constructor(
		private route:  ActivatedRoute,
		private router: Router
	) { }

	public ngOnInit(): void {
		this.landscape = Observable.fromEvent(window, 'resize')
			.startWith(window.innerWidth > window.innerHeight)
			.map(() => window.innerWidth > window.innerHeight);

		// TODO: initial filter
		this.selectables = new BehaviorSubject<Activity[]>(
			this.route.snapshot.data['activities'] || []);
	}

	public ngAfterViewInit(): void {

	}

	public ngOnDestroy(): void {
		this.selectables.next(null);
		this.selectables.complete();

		this.ngUnsubscribe.next(null);
		this.ngUnsubscribe.complete();
	}


	private handleTabular(): void {
	}

	private handleTracking(): void {
	}

	private handleTranslate(): void {
	}

}




		// this.activity.next(null);
		// this.activity.complete();

		// this.organisation.next(null);
		// this.organisation.complete();

	// private clearRoute(): void {
	// 	for (const child of this.route.children) {
	// 		switch (child.component) {
	// 			case AboutActivityComponent:
	// 				this.activity.next(null);
	// 				break;
	// 			case AboutOrganisationComponent:
	// 				this.organisation.next(null);
	// 				break;
	// 			default:
	// 				continue;
	// 		}
	// 	}
	// }

		// Observable.merge(
		// 	this.activity.map(i => i && ['activity', i.id]),
		// 	this.organisation.map(i => i && ['organisation', i.id])
		// ).takeUntil(this.ngUnsubscribe)
		// 	.subscribe(i => this.router.navigate(i || ['']));

		// private router: Router
		// const activityRoute: ActivatedRoute = this.route.children
		// 	.find(i => i.component === AboutActivityComponent);

		// const organisationRoute: ActivatedRoute = this.route.children
		// 	.find(i => i.component === AboutOrganisationComponent);

		// this.activity = new BehaviorSubject<Activity>(
		// 	activityRoute ? activityRoute.snapshot.data.activity : null);

		// this.organisation = new BehaviorSubject<Organisation>(
		// 	organisationRoute ? organisationRoute.snapshot.data.activity : null);


	// private activity: BehaviorSubject<Activity>;

	// private organisation: BehaviorSubject<Organisation>;
