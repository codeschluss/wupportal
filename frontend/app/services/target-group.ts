import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Service } from 'app/services/service';
import { TargetGroup } from 'app/models/target-group';

@Injectable()
export class TargetGroupService extends Service<TargetGroup> {

	protected baseURL: string = 'target_groups';

	protected storable: boolean = true;

	protected syncable: boolean = true;

	protected synctime: number = 1000 * 120;

	public filter(query: string): Observable<TargetGroup[]> {
		return this.items.asObservable();
	}

}
