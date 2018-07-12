import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModel, NgForm } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { TargetGroupService } from 'app/services/data.service.factory';
import { Constants } from 'app/services/constants';
import { DataService } from 'app/services/data.service';
import { DataServiceFactory } from '../../../services/data.service.factory';
import { TargetGroup } from '../../../models/target-group';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

// @Author: Pseipel

@Component({
	selector: 'targetgroup-list',
	templateUrl: 'targetgroup.list.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class TargetGroupListComponent implements OnInit {

	public targetGroups: TargetGroup[];
	private loading: boolean = true;
	public newTargetGroupName: string = '';
	private faPencilAlt: IconDefinition = faPencilAlt;

	constructor(
		private location: Location,
		public constants: Constants,
		@Inject(TargetGroupService) private targetGroupService: DataService,
	) {
	}

	ngOnInit(): void {
		this.targetGroupService.getAll().subscribe(
			targetgroups => { this.targetGroups = targetgroups; },
			null,
			() => this.loading = false);
	}

	back(): void {
		this.location.back();
	}

}
