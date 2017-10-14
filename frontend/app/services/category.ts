import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Category } from 'app/models/category';
import { Service } from 'app/services/service';

@Injectable()
export class CategoryService extends Service<Category> {

	protected baseURL: string = 'categories';

	protected storable: boolean = true;

	protected syncable: boolean = true;

	protected synctime: number = 1000 * 120;

	public filter(query: string): Observable<Category[]> {
		return this.items.asObservable();
	}

}
