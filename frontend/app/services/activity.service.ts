import { Injectable } from '@angular/core';

import { Activity } from '../common/model/activity';
import { Service } from './service';

@Injectable()
export class ActivityService extends Service {

	getActivities(): Promise<Activity[]> {
		return this.http.get(this.baseURL + 'activities/', { headers: this.headers })
			.toPromise()
			.then(response => response.json().activities as Activity[])
			.catch(this.handleError);
	}
}
