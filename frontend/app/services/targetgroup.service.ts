import { Injectable } from '@angular/core';

import { Service } from 'app/services/service';
import { TargetGroup } from 'app/models/target-group';

@Injectable()
export class TargetgroupService extends Service<TargetGroup> {

	public repoURL: string = 'target_groups/';

	getAllTargetgroups(): Promise<TargetGroup[]> {
		return this.http.get(this.baseURL + this.repoURL, { headers: this.headers })
			.toPromise()
			.then(response => response.json().targetGroups as TargetGroup[])
			.catch(this.handleError);
	}

}
