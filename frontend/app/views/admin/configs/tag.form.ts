import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Tag } from '../../../models/tag';
import { Constants } from 'app/services/constants';
import { DataService } from 'app/services/data.service';
import { TagService } from '../../../services/data.service.factory';
import { TranslatableFieldsComponent } from '../translations/translatable.form';

@Component({
	selector: 'tag-edit',
	templateUrl: 'tag.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class TagFormComponent {

	tag: Tag;
	@ViewChild('translatableTagFieldsComponent') translatableFieldsComponent: TranslatableFieldsComponent;

	constructor(
		private location: Location,
		public constants: Constants,
		public route: ActivatedRoute,
		@Inject(TagService) private tagService: DataService,
	) {
		this.route.paramMap
			.switchMap((params: ParamMap) => {
				if (params.get('id') === 'new') {
					return new Observable(observer => observer.next(new Tag({})));
				} else {
					return this.tagService.get(params.get('id'));
				}
			})
			.subscribe(tag => {
				this.tag = new Tag(tag);
			});
	}

	delete(): void {
		this.tagService.delete(this.tag.id).subscribe(() => this.back());
	}

	onSubmit(): void {
		this.translatableFieldsComponent.saveTranslations();
		if (this.tag.id) {
			this.tagService.edit(this.tag).subscribe(() => this.back());
		} else {
			this.tagService.add(this.tag).subscribe(() => this.back());
		}
	}

	back(): void {
		this.location.back();
	}

}



