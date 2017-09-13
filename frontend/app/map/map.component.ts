import { Component, OnInit, ViewChild } from '@angular/core';
import { MapBrowserEvent, Feature, style, layer } from 'openlayers';
import { MdSidenav } from '@angular/material';

import { ActivityDetailComponent } from './activityDetail/activity-detail.component';

import { Service } from '../services/service';
import { ActivityService } from '../services/activity.service';
import { ConfigurationService } from '../services/configuration.service';
import { CategoryService } from '../services/category.service';
import { SuburbService } from '../services/suburb.service';
import { TargetgroupService } from '../services/targetgroup.service';

import { Activity } from '../common/model/activity';
import { Configuration } from '../common/model/configuration';
import { Selectable } from '../common/model/forms/selectable';

@Component({
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
	providers: [Service, ConfigurationService, ActivityService, CategoryService, SuburbService, TargetgroupService]
})

export class MapComponent implements OnInit {

	@ViewChild(ActivityDetailComponent)
	private activityDetailComponent: ActivityDetailComponent;

	@ViewChild('sidenavActivityDetail')
	public sidenavActivityDetail: MdSidenav;

	public activities: Activity[];
	public freeSearch: string;
	public configuration: Configuration;

	// advanced search
	public selectableCategories: Selectable[];
	public selectableSuburbs: Selectable[];
	public selectableTargetgroups: Selectable[];

	public selectedActivity = new Activity();

	constructor(
		private configurationService: ConfigurationService,
		private activityService: ActivityService,
		private categoryService: CategoryService,
		private suburbService: SuburbService,
		private targetgroupService: TargetgroupService
	) { }

	onSelect(activity: Activity): void {
		this.activityDetailComponent.setActivity(activity);
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

	// TODO: just prototyping
	onFreeSearch(): void {
		this.activities = new Array();
		this.activityService.getActivities().then(activities => {
			activities.forEach(act => {
				console.debug("activity: ", act);
				if (act.name == this.freeSearch) {
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
