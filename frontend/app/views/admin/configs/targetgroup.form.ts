import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModel, NgForm } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TargetGroup } from '../../../models/target-group';
import { Constants } from 'app/services/constants';
import { DataService } from 'app/services/data.service';
import { DataServiceFactory, TargetGroupService } from '../../../services/data.service.factory';
import { TranslatableConfigComponent } from './translatable.config';

@Component({
	selector: 'targetgroup-edit',
	templateUrl: 'targetgroup.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class TargetGroupFormComponent {

	private loading: boolean = true;
	targetGroup: TargetGroup;
	@ViewChild('translatableConfigComponent') translatableConfigComponent: TranslatableConfigComponent;

	constructor(
		private location: Location,
		public constants: Constants,
		public route: ActivatedRoute,
		@Inject(TargetGroupService) private targetGroupService: DataService,
	) {
		this.route.paramMap
			.switchMap((params: ParamMap) => {
				if (params.get('id') === 'new') {
					return new Observable(observer => observer.next(new TargetGroup({})));
				} else {
					return this.targetGroupService.get(params.get('id'));
				}
			})
			.subscribe(targetGroup => {
				this.targetGroup = new TargetGroup(targetGroup);
			});
	}

	delete(): void {
		this.targetGroupService.delete(this.targetGroup.id).subscribe(() => this.back());
	}

	onSubmit(): void {
		this.translatableConfigComponent.saveTranslations();
		if (this.targetGroup.id) {
			this.targetGroupService.edit(this.targetGroup).subscribe(() => this.back());
		} else {
			this.targetGroupService.add(this.targetGroup).subscribe(() => this.back());
		}
	}

	back(): void {
		this.location.back();
	}

}



