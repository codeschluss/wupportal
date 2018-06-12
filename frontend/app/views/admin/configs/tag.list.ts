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
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

// @Author: Pseipel

@Component({
	selector: 'tag-list',
	templateUrl: 'tag.list.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class TagListComponent implements OnInit {

	public tags: Tag[];
	private loading: boolean = true;
	faPencilAlt: IconDefinition = faPencilAlt;

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

	back(): void {
		this.location.back();
	}

}
