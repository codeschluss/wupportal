import { Injectable } from '@angular/core';

import { DataService } from 'app/services/data.service';
import { TargetGroup } from 'app/models/target-group';

@Injectable()
export class TargetGroupService extends DataService<TargetGroup> {

	protected baseURL: string = '/target_groups/'

	getAllTargetgroups(): Promise<TargetGroup[]> {
		return this.http.get(this.baseURL, { headers: this.headers })
			.toPromise()
			.then(response => response.json().targetGroups as TargetGroup[])
			.catch(this.handleError);
	}

}
