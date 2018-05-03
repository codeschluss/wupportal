import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Model } from 'app/models/model';

@Component({
	selector: 'search-filter',
	styles: [
		'fa-icon { padding-right: 8px !important; }',
		'fa-icon::ng-deep path { stroke: black; stroke-width: 24px; }',
		'mat-list-option::ng-deep .mat-list-text { flex-flow: row !important; }'
	],
	template: `
		<mat-selection-list (selectionChange)="onChange($event)">
			<ng-container *ngFor="let i of route.snapshot.data[field.toLowerCase()]">
				<mat-list-option [value]="i.id">
					<ng-container *ngIf="i.color">
						<fa-icon icon="bookmark" [style.color]="i.color"></fa-icon>
					</ng-container>
					{{ i.name }}
				</mat-list-option>
			</ng-container>
		</mat-selection-list>
	`
})

export class SearchFilterComponent implements OnInit {

	@Input()
	public field: string;

	@Output()
	public filter: EventEmitter<[string, Model[]]>;

	private filters: Model[];

	constructor(
		private route: ActivatedRoute
	) {
		this.filter = new EventEmitter<[string, Model[]]>();
	}

	public ngOnInit(): void {
		this.filters = [];
		this.filter.emit([this.field, this.filters]);
	}

	private onChange(event: MatSelectionListChange): void {
		const model = this.route.snapshot.data[this.field.toLowerCase()]
			.find(i => i.id === event.option.value);

		this.filters = this.filters.includes(model)
			? this.filters.filter(i => i !== model)
			: this.filters.concat(model);

		this.filter.emit([this.field, this.filters]);
	}

}
