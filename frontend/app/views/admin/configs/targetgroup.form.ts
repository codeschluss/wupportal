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

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

// @Author: Pseipel

@Component({
	selector: 'targetgroup-form',
	templateUrl: 'targetgroup.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class TargetGroupComponent implements OnInit {

	private targetGroups: TargetGroup[];
	private loading: boolean = true;
	private newTargetGroupName: string = '';
	private targeGroupsToDelte: TargetGroup[] = [];
	private faTrashAlt: IconDefinition = faTrashAlt;

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

	mergeTargetGroups(): Observable<any[]> {
		const observableTargetGroupArray: Observable<any>[] = [];
		this.targetGroups.map(targetGroup => {
			if (targetGroup.id) {
				observableTargetGroupArray.push(this.targetGroupService.edit(targetGroup));
			} else {
				observableTargetGroupArray.push(this.targetGroupService.add(targetGroup));
			}
		});
		this.targeGroupsToDelte.map(targetGroupToDelete =>
			observableTargetGroupArray.push(this.targetGroupService.delete(targetGroupToDelete.id))
		);
		return Observable.forkJoin(observableTargetGroupArray);
	}

	addTargetGroup(): void {
		const newTargetGroup = new TargetGroup();
		newTargetGroup.name = this.newTargetGroupName;
		this.targetGroups.push(newTargetGroup);
		this.newTargetGroupName = '';
	}

	deleteTargetGroup(tg: TargetGroup): void {
		console.log('tg: ', tg);
		console.log('tg.name: ', tg.name);
		this.targeGroupsToDelte.push(tg);
		this.targetGroups = this.targetGroups.filter(item => item !== tg);
	}

	onSubmit(): void {
		this.mergeTargetGroups().subscribe(() => this.back());
	}

	back(): void {
		this.location.back();
	}

}

