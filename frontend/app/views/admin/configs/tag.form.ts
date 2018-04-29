import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModel, NgForm } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { TagService } from 'app/services/data.service.factory';
import { Constants } from 'app/services/constants';
import { DataService } from 'app/services/data.service';
import { DataServiceFactory } from '../../../services/data.service.factory';
import { Tag } from '../../../models/tag';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

// @Author: Pseipel

@Component({
	selector: 'tag-form',
	templateUrl: 'tag.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class TagComponent implements OnInit {

	private tags: Tag[];
	private loading: boolean = true;
	private newTagName: string = '';
	private targeGroupsToDelte: Tag[] = [];
	private faTrashAlt: IconDefinition = faTrashAlt;

	constructor(
		private location: Location,
		public constants: Constants,
		@Inject(TagService) private tagService: DataService,
	) {
	}

	ngOnInit(): void {
		this.tagService.getAll().subscribe(
			targetgroups => { this.tags = targetgroups; },
			null,
			() => this.loading = false);
	}

	mergeTags(): Observable<any[]> {
		const observableTagArray: Observable<any>[] = [];
		this.tags.map(tag => {
			if (tag.id) {
				observableTagArray.push(this.tagService.edit(tag));
			} else {
				observableTagArray.push(this.tagService.add(tag));
			}
		});
		this.targeGroupsToDelte.map(tagToDelete =>
			observableTagArray.push(this.tagService.delete(tagToDelete.id))
		);
		return Observable.forkJoin(observableTagArray);
	}

	addTag(): void {
		const newTag = new Tag();
		newTag.name = this.newTagName;
		this.tags.push(newTag);
		this.newTagName = '';
	}

	deleteTag(tag: Tag): void {
		this.targeGroupsToDelte.push(tag);
		this.tags = this.tags.filter(item => item !== tag);
	}

	onSubmit(): void {
		this.mergeTags().subscribe(() => this.back());
	}

	back(): void {
		this.location.back();
	}

}

