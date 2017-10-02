import { Injectable } from '@angular/core';

import { Category } from 'app/models/category';
import { DataService } from 'app/services/data.service';

@Injectable()
export class CategoryService extends DataService<Category> {

	protected baseURL: string = '/categories/'

	getAllCategories(): Promise<Category[]> {
		return this.http.get(this.baseURL, { headers: this.headers })
			.toPromise()
			.then(response => response.json().categories as Category[])
			.catch(this.handleError);
	}

}
