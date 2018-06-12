import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModel, NgForm } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Constants } from 'app/services/constants';
import { DataService } from 'app/services/data.service';
import { DataServiceFactory, CategoryService } from '../../../services/data.service.factory';
import { TranslatableConfigComponent } from './translatable.config';
import { Category } from '../../../models/category';

@Component({
	selector: 'category-edit',
	templateUrl: 'category.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class CategoryFormComponent {

	private loading: boolean = true;
	category: Category;
	@ViewChild('translatableConfigComponent') translatableConfigComponent: TranslatableConfigComponent;

	constructor(
		private location: Location,
		public constants: Constants,
		public route: ActivatedRoute,
		@Inject(CategoryService) private categoryService: DataService,
	) {
		this.route.paramMap
			.switchMap((params: ParamMap) => {
				if (params.get('id') === 'new') {
					return new Observable(observer => observer.next(new Category({})));
				} else {
					return this.categoryService.get(params.get('id'));
				}
			})
			.subscribe(category => {
				this.category = new Category(category);
			});
	}

	delete(): void {
		this.categoryService.delete(this.category.id).subscribe(() => this.back());
	}

	onSubmit(): void {
		this.translatableConfigComponent.saveTranslations();
		if (this.category.id) {
			this.categoryService.edit(this.category).subscribe(() => this.back());
		} else {
			this.categoryService.add(this.category).subscribe(() => this.back());
		}
	}

	back(): void {
		this.location.back();
	}

}



