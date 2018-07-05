import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Constants } from 'app/services/constants';
import { DataService } from 'app/services/data.service';
import { CategoryService } from '../../../services/data.service.factory';
import { Category } from '../../../models/category';
import { TranslatableFieldsComponent } from '../translations/translatable.form';

@Component({
	selector: 'category-edit',
	templateUrl: 'category.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class CategoryFormComponent {

	category: Category;
	@ViewChild('translatableCategoryFieldsComponent') translatableFieldsComponent: TranslatableFieldsComponent;

	colors: String[];

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
		this.colors = this.constants.cssColorNames;
	}

	delete(): void {
		this.categoryService.delete(this.category.id).subscribe(() => this.back());
	}

	onSubmit(): void {
		this.translatableFieldsComponent.saveTranslations();
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



