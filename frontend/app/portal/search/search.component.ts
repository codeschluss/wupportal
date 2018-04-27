import { Component, Input, ViewChild } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Activity } from 'app/models/activity';
import { MatInput } from '@angular/material';

@Component({
	selector: 'search-component',
	styleUrls: ['search.component.css'],
	templateUrl: 'search.component.html'
})

export class SearchComponent {

	@Input()
	public selectables: BehaviorSubject<Activity[]>;

	@ViewChild('query')
	private query: MatInput;

	private commitSearch(query: string): void {
		console.log('query', query);
	}

}
