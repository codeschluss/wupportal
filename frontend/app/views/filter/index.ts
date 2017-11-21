import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';

import { Activity } from 'app/models/activity';

@Component({
	selector: 'filter-component',
	styleUrls: ['style.css'],
	templateUrl: 'view.html'
})

export class FilterComponent {

	@Input()
	public configuration: Observable<Activity[]> = null;

	@Input()
	public selectables: Observable<Activity[]> = null;

	@Output()
	public query: Subject<Activity> = new Subject<Activity>();

	@Output()
	public selection: Subject<Activity> = new Subject<Activity>();

}

// import 'rxjs/add/operator/toPromise';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { AfterViewInit } from '@angular/core';
// import { OnDestroy } from '@angular/core';
// import { OnInit } from '@angular/core';

//  implements AfterViewInit, OnDestroy, OnInit {

// constructor(
// 	private activityService: ActivityService
// ) { }

// public ngAfterViewInit(): void {
// }

// public ngOnDestroy(): void {
// 	this.activityService.disconnect();
// }

// public ngOnInit(): void {
// 	this.activityService.connect();
// }

// public clear(): void {
// 	this.query.value = '';
// 	this.selectables.next([]);
// 	this.selection.next(null);
// }

// public search(): void {
// 	this.selectables =
// 	this.activityService.fetch(this.query.value).toPromise().then((i) => {
// 		this.selectables.next(i);
// 	});
// }

// public settings(): void { }

// this.selection.subscribe((i) => console.log(i));
// this.selecables.
// this.selecables.changes.subscribe((i) => {
// 	console.log(i);
// 	i.opened.subscribe(() => {
// 		console.log(i);
// 	});
// 	i.closed.subscribe(() => {
// 		console.log(i);
// 	});
// });
// this.selecables.forEach((i) => {
// })

// this.query.stateChanges.subscribe(() => {
// 	console.log(this.query.value);
// });
