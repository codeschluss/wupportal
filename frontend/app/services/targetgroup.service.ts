import { Injectable } from '@angular/core';

import { TargetGroup } from '../common/model/target-group';
import { Service } from './service';

@Injectable()
export class TargetgroupService extends Service {

	getAllTargetgroups(): Promise<TargetGroup[]> {
		return this.http.get(this.basicURL + '/targetgroup', { headers: this.headers })
			.toPromise()
			.then(response => response.json().targetgroup as TargetGroup[])
			.catch(this.handleError);
	}
}
