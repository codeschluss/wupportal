import { AfterViewInit, Type, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CrudModel, StrictHttpResponse } from '@portal/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export abstract class BaseTable<Model extends CrudModel>
  implements AfterViewInit {

  @ViewChild(MatPaginator)
  public pager: MatPaginator;

  @ViewChild(MatSort)
  public sorter: MatSort;

  public items: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>([]);

  protected abstract model: Type<Model>;

  protected static template(template: string): string {
    return `
      <mat-table matSort [dataSource]="items">
        <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: columns"></mat-row>
        ${template}
      </mat-table>
      <mat-paginator [pageSize]="10"></mat-paginator>
    `;
  }

  public ngAfterViewInit(): void {
    this.load().then(() => {
      this.pager.page.subscribe(() => this.load());
      this.sorter.sortChange
        .pipe(tap(() => this.pager.pageIndex = 0))
        .subscribe(() => this.load());
    });
  }

  private load(): Promise<void> {
    return this.model['provider'].readAll({
      dir: this.sorter.direction,
      filter: '',
      page: this.pager.pageIndex,
      size: this.pager.pageSize,
      sort: this.sorter.active
    }, (response: StrictHttpResponse<any>) => {
      this.pager.length = response.body.page.totalElements;
      this.pager.pageIndex = response.body.page.number;
      this.pager.pageSize = response.body.page.size;
    }).then((items) => this.items.next(items));
  }

}
