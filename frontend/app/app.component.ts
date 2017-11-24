// import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { MatIconRegistry } from '@angular/material';

import { AdminComponent } from 'app/views/admin/admin.component';
import { DetailsComponent } from 'app/views/details';
// import { FilterComponent } from 'app/views/filter';
import { MappingComponent } from 'app/views/mapping';

import { ActivityService } from 'app/services/activity';
import { CategoryService } from 'app/services/category';
import { ConfigurationService } from 'app/services/configuration';
import { LocationService } from 'app/services/location';
import { NominatimService } from 'app/services/nominatim';
import { OrganisationService } from 'app/services/organisation';
import { SuburbService } from 'app/services/suburb';
import { TargetGroupService } from 'app/services/target-group';
import { UserService } from 'app/services/user';

@Component({
	providers: [
		MatIconRegistry,

		ActivityService,
		CategoryService,
		ConfigurationService,
		LocationService,
		NominatimService,
		OrganisationService,
		SuburbService,
		TargetGroupService,
		UserService
	],
	selector: 'app-root',
	styleUrls: ['app.component.css'],
	templateUrl: 'app.component.html'
})

export class AppComponent implements AfterViewInit, OnDestroy, OnInit {

	@ViewChild(DetailsComponent)
	private detailsComponent: DetailsComponent;

	// @ViewChild(FilterComponent)
	// private filterComponent: FilterComponent;

	@ViewChild(MappingComponent)
	private mappingComponent: MappingComponent;

	constructor(
		private iconRegistry: MatIconRegistry,

		private activityService: ActivityService,
		private categoryService: CategoryService,
		private configurationService: ConfigurationService,
		private locationService: LocationService,
		private nominatimService: NominatimService,
		private organisationService: OrganisationService,
		private suburbService: SuburbService,
		private targetGroupService: TargetGroupService,
		private userService: UserService
	) {
		iconRegistry.registerFontClassAlias('fontawesome', 'fa');
	}

	public ngAfterViewInit(): void {
		// this.filterComponent.selection.subscribe((i) => console.log(i));
		// this.filterComponent.selection.subscribe((i) => console.log(i));
	}

	public ngOnDestroy(): void {
		// this.activityService.disconnect();
		// this.categoryService.disconnect();
		// this.configurationService.disconnect();
		// this.locationService.disconnect();
		// this.organisationService.disconnect();
		// this.suburbService.disconnect();
		// this.targetGroupService.disconnect();
	}

	public ngOnInit(): void {
		// this.filterComponent.selectables = this.activityService.list();
		// this.mappingComponent.selectables = this.activityService.list();

		// this.activityService.connect();
		// this.categoryService.connect();
		// this.configurationService.connect();
		// this.locationService.connect();
		// this.organisationService.connect();
		// this.suburbService.connect();
		// this.targetGroupService.connect();
	}

}
