import { AfterViewInit, ContentChildren, HostBinding, Input, QueryList, Type, ViewChild } from '@angular/core';
import { MatColumnDef, MatPaginator, MatSort, MatTable, SortDirection } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, StrictHttpResponse } from '@portal/core';
import { BehaviorSubject, merge, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

export interface TableColumn {
  name: string;
  sort?: boolean;
  value: (item) => string;
}

export abstract class BaseTable<Model extends CrudModel>
  implements AfterViewInit {

  @HostBinding('class')
  public class: string = 'base-table';

  @Input()
  public items: Model[];

  @ViewChild(MatPaginator)
  public pager: MatPaginator;

  @ViewChild(MatSort)
  public sorter: MatSort;

  @ViewChild(MatTable)
  public table: MatTable<Model>;

  @ContentChildren(MatColumnDef)
  public views: QueryList<MatColumnDef>;

  public collate: string[] = [];

  public source: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>([]);

  public abstract columns: TableColumn[];

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected static template(template: string): string {
    return template + `
      <mat-table matSort [dataSource]="source.asObservable()">
        <mat-header-row *matHeaderRowDef="collate"></mat-header-row>
        <mat-row *matRowDef="let item; columns: collate"></mat-row>
        <ng-container *ngFor="let column of columns">
          <ng-container [matColumnDef]="column.name">
            <mat-header-cell mat-sort-header
              [disabled]="!column.sort" *matHeaderCellDef>
              <ng-container *ngTemplateOutlet="label;
                context: { case: column }">
              </ng-container>
              </mat-header-cell>
            <mat-cell *matCellDef="let item">
              {{ column.value(item) }}
            </mat-cell>
          </ng-container>
        </ng-container>
        <ng-content></ng-content>
      </mat-table>
      <mat-paginator [pageSize]="10"></mat-paginator>
    `;
  }

  public constructor(
    private resolver: CrudResolver,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngAfterViewInit(): void {
    this.collate = [
      ...this.columns.map((column) => column.name),
      ...this.views.map((def) => def.name)
    ];

    this.sorter.disableClear = true;
    this.views.forEach((view) => this.table.addColumnDef(view));

    Object.keys(this.route.snapshot.queryParams).forEach((param) => {
      const value = this.route.snapshot.queryParamMap.get(param);
      switch (param) {
        case 'dir': this.sorter.direction = value as SortDirection; break;
        case 'page': this.pager.pageIndex = parseInt(value, 10); break;
        case 'size': this.pager.pageSize = parseInt(value, 10); break;
        case 'sort': this.sorter.active = value; break;
      }
    });

    merge(
      of(null),
      this.pager.page,
      this.sorter.sortChange.pipe(tap(() => this.pager.pageIndex = 0))
    ).subscribe(() => this.reload());
  }

  public reload(): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        dir: this.sorter.direction || null,
        filter: '' || null,
        page: this.pager.pageIndex || null,
        size: this.pager.pageSize || null,
        sort: this.sorter.active || null
      }
    }).then(() => this.items ? this.relist() : this.refetch());
  }

  private refetch(): void {
    const provider = this.model['provider'].system;
    provider.call(provider.methods.readAll, {
      dir: this.sorter.direction,
      embeddings: CrudJoiner.to(this.joiner.graph),
      filter: '',
      page: this.pager.pageIndex,
      size: this.pager.pageSize,
      sort: this.sorter.active
    }).pipe(
      tap((response) => this.page(response as StrictHttpResponse<any>)),
      map((response) => provider.cast(response)),
      mergeMap((items) => this.resolver.refine(items as any, this.joiner.graph))
    ).subscribe((items) => this.source.next(items));
  }

  private relist(): void {
    this.pager.length = this.items.length;
    this.source.next((this.sort(this.items)).slice(
      this.pager.pageIndex * this.pager.pageSize,
      (this.pager.pageIndex + 1) * this.pager.pageSize
    ));
  }

  private page(response: StrictHttpResponse<any>) {
    this.pager.length = response.body.page.totalElements;
    this.pager.pageIndex = response.body.page.number;
    this.pager.pageSize = response.body.page.size;
  }

  private sort(items: Model[]): Model[] {
    const column = this.columns.find((c) => c.name === this.sorter.active);
    const value = column ? column.value : (item) => item[this.sorter.active];

    return items.sort((a, b) => this.sorter.direction === 'asc'
      ? (value(a) || '').localeCompare(value(b) || '')
      : (value(b) || '').localeCompare(value(a) || ''));
  }

}
