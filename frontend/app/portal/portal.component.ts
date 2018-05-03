import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {
	AfterViewInit,
	Component,
	Inject,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Activity } from 'app/models/activity';
import { Translation } from 'app/models/translation';

import { UserService } from 'app/services/user.service';

import {
	TranslationDialogComponent
} from 'app/portal/dialogs/translation.dialog.component';

// import { Organisation } from 'app/models/organisation';

// import {
// 	AboutActivityComponent
// } from 'app/portal/about/about.activity.component';
// import {
// 	AboutOrganisationComponent
// } from 'app/portal/about/about.organisation.component';
// import { MappingComponent } from 'app/portal/mapping/mapping.component';
// import { SearchComponent } from 'app/portal/search/search.component';

@Component({
	providers: [UserService],
	styleUrls: ['portal.component.css'],
	templateUrl: 'portal.component.html',
})

export class PortalComponent implements OnInit, AfterViewInit, OnDestroy {

	// @ViewChild('mapping-component')
	// private mappingComponent: MappingComponent;

	// @ViewChild('search-component')
	// private searchComponent: SearchComponent;

	private landscape: Observable<boolean>;
	private selectables: BehaviorSubject<Activity[]>;

	private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

	constructor(
		@Inject(UserService)
		private userService: UserService,

		private dialog: MatDialog,
		private route:  ActivatedRoute,
		private router: Router
	) { }

	public ngOnInit(): void {
		this.landscape = Observable.fromEvent(window, 'resize')
			.startWith(window.innerWidth > window.innerHeight)
			.map(() => window.innerWidth > window.innerHeight);

		this.selectables = new BehaviorSubject<Activity[]>(
			this.route.snapshot.data.activities || []);
	}

	public ngAfterViewInit(): void {
	}

	public ngOnDestroy(): void {
		this.selectables.next(null);
		this.selectables.complete();

		this.ngUnsubscribe.next(null);
		this.ngUnsubscribe.complete();
	}

	private handleTracking(): void {
	}

	private handleTranslate(): void {
		this.dialog.open(TranslationDialogComponent, {
			data: this.route.snapshot.data.translations
		}).afterClosed().filter(i => i).subscribe((translation: Translation) => {
			if (translation.locale !== this.userService.getCurrentLanguage()) {
				const navigation = this.router.onSameUrlNavigation;
				const resolve = this.route.routeConfig.runGuardsAndResolvers;
				const strategy = this.router.routeReuseStrategy.shouldReuseRoute;

				this.router.onSameUrlNavigation = 'reload';
				this.router.routeReuseStrategy.shouldReuseRoute = () => false;
				this.route.routeConfig.runGuardsAndResolvers = 'always';
				this.userService.setCurrentLanguage(translation.locale);

				this.router.navigate([this.router.url]).then(() => {
					this.router.onSameUrlNavigation = navigation;
					this.router.routeReuseStrategy.shouldReuseRoute = strategy;
					this.route.routeConfig.runGuardsAndResolvers = resolve;
				});
			}
		});
	}

}
