import { MatPaginatorIntl } from '@angular/material';
import { Constants } from 'app/services/constants';

export class PaginatorLabels extends MatPaginatorIntl {

	itemsPerPageLabel: string = Constants.itemsPerPageLabel;
	nextPageLabel: string = Constants.nextPageLabel;
	previousPageLabel: string = Constants.previousPageLabel;

	getRangeLabel: any = function (page: number, pageSize: number, length: number): string {
		if (length === 0 || pageSize === 0) {
			return '0 ' + Constants.of + ' ' + length;
		}
		length = Math.max(length, 0);
		const startIndex = page * pageSize;
		const endIndex = startIndex < length ?
			Math.min(startIndex + pageSize, length) :
			startIndex + pageSize;
		return startIndex + 1 + ' - ' + endIndex + ' ' + Constants.of + ' ' + length;
	};

}
