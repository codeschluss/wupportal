import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MapBrowserEvent, Feature, style, layer } from 'openlayers';
import { MdSidenav } from '@angular/material';

import { ActivityDetailComponent } from './activityDetail/activity-detail.component';
import { OrganisationDetailComponent } from './organisationDetail/organisation-detail.component';

import { Service } from '../services/service';
import { ActivityService } from '../services/activity.service';
import { ConfigurationService } from '../services/configuration.service';
import { CategoryService } from '../services/category.service';
import { SuburbService } from '../services/suburb.service';
import { TargetgroupService } from '../services/targetgroup.service';

import { Activity } from '../common/model/activity';
import { Organisation } from '../common/model/organisation';
import { Configuration } from '../common/model/configuration';
import { Selectable } from '../common/model/forms/selectable';
import { DetailState } from './detail-state';

@Component({
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
	providers: [Service, ConfigurationService, ActivityService, CategoryService, SuburbService, TargetgroupService]
})


export class MapComponent implements OnInit {

	@ViewChild(ActivityDetailComponent)
	private activityDetailComponent: ActivityDetailComponent;

	@ViewChildren('OrganisationDetailComponent')
	private organisationDetailComponent: OrganisationDetailComponent;

	@ViewChild('sidenavActivityDetail')
	public sidenavActivityDetail: MdSidenav;

	public selectedActivity = new Activity();
	public state: DetailState;
	public detailState = DetailState;

	public activities: Activity[];
	public freeSearch: string;
	public configuration: Configuration;

	// advanced search
	public selectableCategories: Selectable[];
	public selectableSuburbs: Selectable[];
	public selectableTargetgroups: Selectable[];

	constructor(
		private configurationService: ConfigurationService,
		private activityService: ActivityService,
		private categoryService: CategoryService,
		private suburbService: SuburbService,
		private targetgroupService: TargetgroupService
	) { }

	// TODO: refactoring -> full state handling with external service
	onSelectActivity(activity: Activity): void {
		this.activityDetailComponent.setActivity(activity);
		this.state = DetailState.ACTIVITY;
		if (!this.sidenavActivityDetail._isAnimating) {
			if (this.selectedActivity.id === activity.id) {
				this.selectedActivity = new Activity();
				this.sidenavActivityDetail.toggle();
			} else {
				this.selectedActivity = activity;
				if (!this.sidenavActivityDetail.opened) {
					this.sidenavActivityDetail.toggle();
				}
			}
		}
	}

	onSelectOrganisation(organisation: Organisation) {
		this.state = DetailState.ORGANISATION;
		this.organisationDetailComponent.setOrganisation(organisation);
	}

	onGoBack() {
		this.state = DetailState.ACTIVITY;
	}

	// TODO: just prototyping
	onFreeSearch(): void {
		this.activities = new Array();
		this.activityService.getActivities().then(activities => {
			activities.forEach(act => {
				if (act.name === this.freeSearch) {
					this.activities.push(act);
				}
			});
		});
	}

	// TODO: just prototyping
	onAdvancedSearch(): void {
		this.getSelectedOptions(this.selectableCategories).forEach(element => {
			console.log('Selected Category: ' + element.value);
		});
		this.getSelectedOptions(this.selectableSuburbs).forEach(element => {
			console.log('Selected Suburb: ' + element.value);
		});
		this.getSelectedOptions(this.selectableTargetgroups).forEach(element => {
			console.log('Selected Targetgroups: ' + element.value);
		});
	}

	getSelectedOptions(selectables: Selectable[]): Selectable[] {
		return selectables.filter(opt => opt.checked);
	}

	ngOnInit(): void {
		this.initConfig();
		this.initSelectables();
		this.state = DetailState.ACTIVITY;
	}

	initConfig(): void {
		this.configurationService.getConfiguration().then(config => this.configuration = config);
	}

	initSelectables(): void {
		this.initCategories();
		this.initSuburbs();
		this.initTargetgroups();
	}

	initCategories(): void {
		this.selectableCategories = new Array();
		this.categoryService.getAllCategories().then(categories => {
			categories.forEach(category => {
				this.selectableCategories.push(new Selectable(category.id, category.name, false));
			});
		});
	}

	initSuburbs(): void {
		this.selectableSuburbs = new Array();
		this.suburbService.getAllSuburbs().then(suburbs => {
			suburbs.forEach(suburb => {
				this.selectableSuburbs.push(new Selectable(suburb.id, suburb.name, false));
			});
		});
	}

	initTargetgroups(): void {
		this.selectableTargetgroups = new Array();
		this.targetgroupService.getAllTargetgroups().then(targetgroups => {
			targetgroups.forEach(targetgroup => {
				this.selectableTargetgroups.push(new Selectable(targetgroup.id, targetgroup.name, false));
			});
		});
	}

}
