import { Injectable } from '@angular/core';

import { Category } from 'app/models/category';
import { Service } from 'app/services/service';

@Injectable()
export class CategoryService extends Service<Category> {

	protected baseURL: string = '/categories/';

}
