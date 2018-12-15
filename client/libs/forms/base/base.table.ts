import { AfterViewInit, Input, Type, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CrudModel, StrictHttpResponse } from '@portal/core';
import { BehaviorSubject, merge, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface TableColumn {
  name: string;
  sort?: boolean;
  value: (item: CrudModel) => string;
}

export abstract class BaseTable<Model extends CrudModel>
  implements AfterViewInit {

  @Input()
  public items: Model[];

  @ViewChild(MatPaginator)
  public pager: MatPaginator;

  @ViewChild(MatSort)
  public sorter: MatSort;

  public source: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>([]);

  public abstract columns: TableColumn[];

  protected abstract model: Type<Model>;

  protected static template(template: string): string {
    return template + `
      <mat-table matSort [dataSource]="source.asObservable()">
        <mat-header-row *matHeaderRowDef="colDefs"></mat-header-row>
        <mat-row *matRowDef="let item; columns: colDefs"></mat-row>
        <ng-container *ngFor="let col of columns" [matColumnDef]="col.name">
          <ng-container *ngIf="col.sort">
            <mat-header-cell mat-sort-header *matHeaderCellDef>
              <ng-container *ngTemplateOutlet="label; context: { case: col }">
              </ng-container>
            </mat-header-cell>
          </ng-container>
          <ng-container *ngIf="!col.sort">
            <mat-header-cell *matHeaderCellDef>
              <ng-container *ngTemplateOutlet="label; context: { case: col }">
              </ng-container>
            </mat-header-cell>
          </ng-container>
          <mat-cell *matCellDef="let item">{{ col.value(item) }}</mat-cell>
        </ng-container>
      </mat-table>
      <mat-paginator [pageSize]="10"></mat-paginator>
    `;
  }

  public get colDefs(): string[] {
    return this.columns.map((column) => column.name);
  }

  public ngAfterViewInit(): void {
    merge(
      of(null),
      this.pager.page,
      this.sorter.sortChange.pipe(tap(() => this.pager.pageIndex = 0))
    ).subscribe(() => this.items ? this.list() : this.reload());
  }

  private list(): void {
    this.pager.length = this.items.length;
    this.source.next(this.items.sort((a, b) => this.sorter.direction === 'asc'
      ? (a[this.sorter.active] || '').localeCompare(b[this.sorter.active])
      : (b[this.sorter.active] || '').localeCompare(a[this.sorter.active])
    ).slice(
      this.pager.pageIndex * this.pager.pageSize,
      (this.pager.pageIndex + 1) * this.pager.pageSize
    ));
  }

  private reload(): void {
    const provider = this.model['provider'].system;
    provider.call(provider.methods.readAll, {
      dir: this.sorter.direction,
      filter: '',
      page: this.pager.pageIndex,
      size: this.pager.pageSize,
      sort: this.sorter.active
    }).pipe(
      tap((response) => this.scroll(response as any)),
      map((response) => provider.cast(response))
    ).subscribe((items) => this.source.next(items));
  }

  private scroll(response: StrictHttpResponse<any>) {
    this.pager.length = response.body.page.totalElements;
    this.pager.pageIndex = response.body.page.number;
    this.pager.pageSize = response.body.page.size;
  }

}
