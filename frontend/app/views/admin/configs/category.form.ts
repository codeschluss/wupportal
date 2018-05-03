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

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

// @Author: Pseipel

@Component({
	selector: 'category-form',
	templateUrl: 'category.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class CategoryComponent implements OnInit {

	public categories: Category[];
	private loading: boolean = true;
	public newCategoryName: string = '';
	private targeGroupsToDelte: Category[] = [];
	private faTrashAlt: IconDefinition = faTrashAlt;

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

	mergeCategories(): Observable<any[]> {
		const observableCategoryArray: Observable<any>[] = [];
		this.categories.map(category => {
			if (category.id) {
				observableCategoryArray.push(this.categoryService.edit(category));
			} else {
				observableCategoryArray.push(this.categoryService.add(category));
			}
		});
		this.targeGroupsToDelte.map(categoryToDelete =>
			observableCategoryArray.push(this.categoryService.delete(categoryToDelete.id))
		);
		return Observable.forkJoin(observableCategoryArray);
	}

	addCategory(): void {
		const newCategory = new Category();
		newCategory.name = this.newCategoryName;
		this.categories.push(newCategory);
		this.newCategoryName = '';
	}

	deleteCategory(category: Category): void {
		this.targeGroupsToDelte.push(category);
		this.categories = this.categories.filter(item => item !== category);
	}

	onSubmit(): void {
		this.mergeCategories().subscribe(() => this.back());
	}

	back(): void {
		this.location.back();
	}

}
