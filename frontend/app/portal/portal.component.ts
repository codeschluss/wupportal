import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { Activity } from 'app/models/activity';
import { Translation } from 'app/models/translation';

import { UserService } from 'app/services/user.service';

import {
	TranslationDialogComponent
} from 'app/portal/dialogs/translation.dialog.component';

@Component({
	providers: [UserService],
	styleUrls: ['portal.component.css'],
	templateUrl: 'portal.component.html',
})

export class PortalComponent implements OnInit, OnDestroy {

	@Output()
	public selectables: BehaviorSubject<Activity[]>;

	public toolbarHead: ElementRef;
	public viewFabdial: boolean;

	constructor(
		public route:  ActivatedRoute,
		public router: Router,

		@Inject(UserService)
		private userService: UserService,

		private dialog: MatDialog
	) { }

	public ngOnInit(): void {
		this.selectables = new BehaviorSubject<Activity[]>(
			this.route.snapshot.data.activities || []);
	}

	public ngOnDestroy(): void {
		this.selectables.next(null);
		this.selectables.complete();
	}

	public onTracking(): void {
	}

	public onTranslate(): void {
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
