import { Injectable } from '@angular/core';

import { TargetGroup } from '../common/model/target-group';
import { Service } from './service';

@Injectable()
export class TargetgroupService extends Service {

	getAllTargetgroups(): Promise<TargetGroup[]> {
		return this.http.get(this.baseURL + 'targetGroups/', { headers: this.headers })
			.toPromise()
			.then(response => response.json().targetGroups as TargetGroup[])
			.catch(this.handleError);
	}
}
