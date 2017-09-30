import { Injectable } from '@angular/core';

import { Category } from 'app/models/category';
import { Service } from 'app/services/service';

@Injectable()
export class CategoryService extends Service<Category> {

	public repoURL: string = 'categories/'

	getAllCategories(): Promise<Category[]> {
		return this.http.get(this.baseURL + this.repoURL, { headers: this.headers })
			.toPromise()
			.then(response => response.json().categories as Category[])
			.catch(this.handleError);
	}

}
