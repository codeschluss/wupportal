
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { DataService } from 'app/services/data.service';

@Injectable()
export class DataResolver implements Resolve<any> {

	constructor(private dataService: DataService) { }

	resolve(route: ActivatedRouteSnapshot): any {
		const uuid: string = route.paramMap.get('uuid');

		return uuid
			? this.dataService.get(uuid)
			: this.dataService.getAll();
	}
}
