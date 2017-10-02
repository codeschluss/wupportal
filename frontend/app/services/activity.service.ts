import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';

import { Activity } from 'app/models/activity';
import { DataService } from 'app/services/data.service';

@Injectable()
export class ActivityService extends DataService<Activity> {

	protected baseURL: string = '/activities/';

	getActivities(): Promise<Activity[]> {
		return this.http.get(this.baseURL, { headers: this.headers })
			.toPromise()
			.then(response => response.json().activities as Activity[])
			.catch(this.handleError);
	}

	postActivity(activity: Activity) {
		return this.http.post(this.baseURL + 'add/',
			JSON.stringify(activity)
			, { headers: this.headers }
		).subscribe();
	}

	editActivity(activity: Activity) {
		return this.http.put(this.baseURL + 'edit/' +
			activity.id,
			JSON.stringify(activity)
			, { headers: this.headers }
		).subscribe(newActivity => activity = newActivity.json());
	}

	deleteActivity(activity: Activity) {
		return this.http.delete(this.baseURL + 'edit/' +
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
