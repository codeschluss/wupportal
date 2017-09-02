import { Injectable } from '@angular/core';

import { Service } from './service';
import { Category } from '../common/model/category';

@Injectable()
export class CategoryService extends Service {

	getAllCategories(): Promise<Category[]> {
		return this.http.get(this.basicURL + '/category/', { headers: this.headers })
			.toPromise()
			.then(response => response.json().category as Category[])
			.catch(this.handleError);
	}

}
