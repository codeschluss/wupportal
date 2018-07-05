import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModel, NgForm } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { CategoryService } from 'app/services/data.service.factory';
import { Constants } from 'app/services/constants';
import { DataService } from 'app/services/data.service';
import { DataServiceFactory } from '../../../services/data.service.factory';
import { Category } from '../../../models/category';

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

// @Author: Pseipel

@Component({
	selector: 'category-list',
	templateUrl: 'category.list.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class CategoryListComponent implements OnInit {

	public categories: Category[];
	private loading: boolean = true;
	public newCategoryName: string = '';
	private targeGroupsToDelte: Category[] = [];
	private faPencilAlt: IconDefinition = faPencilAlt;

	constructor(
		private location: Location,
		public constants: Constants,
		@Inject(CategoryService) private categoryService: DataService,
	) {
	}

	ngOnInit(): void {
		this.categoryService.getAll().subscribe(
			targetgroups => { this.categories = targetgroups; },
			null,
			() => this.loading = false);
	}

	back(): void {
		this.location.back();
	}

}
