
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { ActivityService } from 'app/services/activity.service';
import { DataService } from 'app/services/data.service';

@Injectable()
export class DataResolver implements Resolve<any> {

	constructor(private dataService: DataService) { }

	resolve(route: ActivatedRouteSnapshot): any {
		let method = 'getAll';
		const uuid = route.paramMap.get('uuid');

		switch (this.dataService.constructor) {
			case ActivityService:
				method = 'getByMapfilter';
				break;
		}

		return uuid ? this.dataService.get(uuid) : this.dataService[method]();
	}
}
