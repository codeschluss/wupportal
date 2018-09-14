import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry, MatSelectionListChange } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Model } from 'app/models/model';

@Component({
	selector: 'search-filter',
	styles: [
		'mat-icon { padding-right: 8px !important; }',
		'mat-icon::ng-deep path { stroke: black; stroke-width: 24px; }',
		'mat-list-option::ng-deep .mat-list-text { align-items: center; }',
		'mat-list-option::ng-deep .mat-list-text { flex-flow: row !important;}'
	],
	template: `
		<mat-selection-list (selectionChange)="onChange($event)">
			<ng-container *ngFor="let i of route.snapshot.data[field.toLowerCase()]">
				<mat-list-option [value]="i.id">
					<ng-container *ngIf="i.color">
						<mat-icon [style.color]="i.color" [svgIcon]="i.id"></mat-icon>
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
		public route: ActivatedRoute,
		private domSanitizer: DomSanitizer,
		private iconRegistry: MatIconRegistry
	) {
		this.filter = new EventEmitter<[string, Model[]]>();
	}

	public ngOnInit(): void {
		this.filters = [];
		this.filter.emit([this.field, this.filters]);

		this.route.snapshot.data[this.field.toLowerCase()]
			.filter((i) => i.hasOwnProperty('color')).map((i) => i.id)
			.forEach((i) => this.iconRegistry.addSvgIcon(i, this.domSanitizer
			.bypassSecurityTrustResourceUrl(`/imgs/categories/${i}.svg`)));
	}

	public onChange(event: MatSelectionListChange): void {
		const model = this.route.snapshot.data[this.field.toLowerCase()]
			.find(i => i.id === event.option.value);

		this.filters = this.filters.includes(model)
			? this.filters.filter(i => i !== model)
			: this.filters.concat(model);

		this.filter.emit([this.field, this.filters]);
	}

}
