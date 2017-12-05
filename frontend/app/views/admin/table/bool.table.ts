import { Component, Input } from '@angular/core';

@Component({
	selector: 'table-bool',
	template: `
		<i *ngIf="bool" class="fa fa-check" aria-hidden="true"></i>
		<i *ngIf="!bool" class="fa fa-times" aria-hidden="true"></i>
    `
})
export class TableBoolComponent {
	@Input() bool: boolean;
}
