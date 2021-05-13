import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})

export class Paginate
  extends MatPaginatorIntl {

  public itemsPerPageLabel: string = null;

  public nextPageLabel: string = null;

  public previousPageLabel: string = null;

  public firstPageLabel: string = null;

  public lastPageLabel: string = null;

  public getRangeLabel = (page: number, size: number, length: number) => {
    if (length === 0 || size === 0) {
      return `0 / ${length}`;
    }

    length = Math.max(length, 0);

    const start = page * size;
    const end = start < length
      ? Math.min(start + size, length)
      : start + size;

    return `${start + 1} - ${end} / ${length}`;
  }

}
