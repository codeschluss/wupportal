import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModel, NgForm } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Tag } from '../../../models/tag';
import { Constants } from 'app/services/constants';
import { DataService } from 'app/services/data.service';
import { DataServiceFactory, TagService } from '../../../services/data.service.factory';
import { TranslatableConfigComponent } from './translatable.config';

@Component({
	selector: 'tag-edit',
	templateUrl: 'tag.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class TagFormComponent {

	private loading: boolean = true;
	tag: Tag;
	@ViewChild('translatableConfigComponent') translatableConfigComponent: TranslatableConfigComponent;

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
		this.translatableConfigComponent.saveTranslations();
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



