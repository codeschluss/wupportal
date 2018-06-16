import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TargetGroup } from '../../../models/target-group';
import { Constants } from 'app/services/constants';
import { DataService } from 'app/services/data.service';
import { TargetGroupService } from '../../../services/data.service.factory';
import { TranslatableFieldsComponent } from '../translations/translatable.form';

@Component({
	selector: 'targetgroup-edit',
	templateUrl: 'targetgroup.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class TargetGroupFormComponent {

	targetGroup: TargetGroup;
	@ViewChild('translatableTargetGroupFieldsComponent') translatableFieldsComponent: TranslatableFieldsComponent;

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
		this.translatableFieldsComponent.saveTranslations();
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



