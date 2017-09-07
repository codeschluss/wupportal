import { Injectable } from '@angular/core';

import { Activity } from '../common/model/activity';
import { Service } from './service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


@Injectable()
export class ActivityService extends Service {

	getActivities(): Promise<Activity[]> {
		return this.http.get(this.baseURL + 'activities/', { headers: this.headers })
			.toPromise()
			.then(response => response.json().activities as Activity[])
			.catch(this.handleError);
	}

	postActivity(activity: Activity) {
		return this.http.post(this.baseURL + 'activities/add/',
			JSON.stringify(activity)
			, { headers: this.headers }
		).subscribe();
	}

	editActivity(activity: Activity) {
		return this.http.put(this.baseURL + 'activities/edit/' +
			activity.id,
			JSON.stringify(activity)
			, { headers: this.headers }
		).subscribe(newActivity => activity = newActivity.json());
	}

	deleteActivity(activity: Activity) {
		return this.http.delete(this.baseURL + 'activities/edit/' +
			activity.id
			, { headers: this.headers }
		).subscribe();
	}

	getActivitiesDatabase(): ActivitiesDatabase {
		return new ActivitiesDatabase(this);
	}

	getActivitiesDataSource(): ActivitiesDataSource {
		return new ActivitiesDataSource(new ActivitiesDatabase(this));
	}

}

export class ActivitiesDatabase {
	public activities: Activity[];
	dataChange: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>([]);

	constructor(private actsService: ActivityService) {
		this.activities = new Array();
		this.actsService.getActivities().then(activities => {
			activities.forEach(act => {
				this.activities.push(act);
				this.dataChange.next(this.activities);
			});
		});
	}
	get data(): Activity[] { return this.dataChange.value; }
}

export class ActivitiesDataSource extends DataSource<any> {
	_filterChange = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }

	constructor(private _actsDatabase: ActivitiesDatabase) {
		super();
	}

	connect(): Observable<Activity[]> {
		const displayDataChanges = [
			this._actsDatabase.dataChange,
			this._filterChange,
		];
		return Observable.merge(...displayDataChanges).map(() => {
			return this._actsDatabase.data.slice().filter((act: Activity) => {
				const searchStr = (act.name).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
			});
		});
	}

	disconnect() { }
}
