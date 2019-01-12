import { AfterViewInit, ContentChildren, HostBinding, Input, OnInit, QueryList, Type, ViewChild } from '@angular/core';
import { MatColumnDef, MatInput, MatPaginator, MatSort, MatTable, SortDirection } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, StrictHttpResponse } from '@portal/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';

export interface TableColumn {
  name: string;
  value: (item) => string;
}

export abstract class BaseTable<Model extends CrudModel>
  implements OnInit, AfterViewInit {

  @HostBinding('class')
  public class: string = 'base-table';

  @Input()
  public items: Model[];

  @ViewChild(MatPaginator)
  public pager: MatPaginator;

  @ViewChild(MatInput)
  public searcher: MatInput;

  @ViewChild(MatSort)
  public sorter: MatSort;

  @ViewChild(MatTable)
  public table: MatTable<Model>;

  @ContentChildren(MatColumnDef)
  public views: QueryList<MatColumnDef>;

  public collate: string[] = [];

  public size: number = 10;

  public source: BehaviorSubject<Model[]>;

  public abstract columns: TableColumn[];

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  public readonly viewpipe: Observable<any> = merge(
    this.route.queryParams.pipe(tap((params) => this.navigate(params)))
  ).pipe(ignoreElements());

  private parameters: any;

  protected static template(template: string): string {
    return template + `
      <mat-form-field><input matInput type="search"></mat-form-field>
      <mat-table matSort [dataSource]="source.asObservable()">
        <mat-header-row *matHeaderRowDef="collate"></mat-header-row>
        <mat-row *matRowDef="let item; columns: collate"></mat-row>
        <ng-container [matColumnDef]="col.name" *ngFor="let col of columns">
          <mat-header-cell mat-sort-header *matHeaderCellDef>
            <ng-container *ngTemplateOutlet="label; context: { case: col }">
            </ng-container>
          </mat-header-cell>
          <mat-cell *matCellDef="let item">{{ col.value(item) }}</mat-cell>
        </ng-container>
        <ng-content></ng-content>
      </mat-table>
      <mat-paginator [pageSize]="size"></mat-paginator>
      <ng-container *ngIf="viewpipe | async"></ng-container>
    `;
  }

  public constructor(
    private resolver: CrudResolver,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.source = new BehaviorSubject([]);
    this.items = this.items || this.route.snapshot.data.items;
  }

  public ngAfterViewInit(): void {
    this.collate = [
      ...this.columns.map((column) => column.name),
      ...this.views.map((def) => def.name)
    ];

    this.sorter.disableClear = true;
    this.views.forEach((view) => this.table.addColumnDef(view));

    merge(
      this.pager.page,
      merge(
        this.searcher.stateChanges.pipe(
          map(() => this.searcher.value || undefined),
          filter((label) => label !== this.route.snapshot.queryParams.find),
          distinctUntilChanged(),
          debounceTime(1000)
        ),
        this.sorter.sortChange
      ).pipe(tap(() => this.pager.pageIndex = 0))
    ).subscribe(() => this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        dir: this.sorter.direction || null,
        find: this.searcher.value || null,
        page: this.pager.pageIndex || null,
        size: this.pager.pageSize !== this.size ? this.pager.pageSize : null,
        sort: this.sorter.active || null
      }
    }));
  }

  private fetch(): void {
    const provider = this.model['provider'].system;
    provider.call(provider.methods.readAll, {
      dir: this.sorter.direction,
      embeddings: CrudJoiner.to(this.joiner.graph),
      filter: this.searcher.value,
      page: this.pager.pageIndex,
      size: this.pager.pageSize,
      sort: this.sorter.active
    }).pipe(
      tap((response) => this.paginate(response as StrictHttpResponse<any>)),
      map((response) => provider.cast(response)),
      mergeMap((items) => this.resolver.refine(items as any, this.joiner.graph))
    ).subscribe((items) => this.source.next(items), () => this.source.next([]));
  }

  private filter(): void {
    const column = this.columns.find((c) => c.name === this.sorter.active);
    const field = column ? column.value : (item) => item[this.sorter.active];
    const regex = this.searcher.value && new RegExp(this.searcher.value, 'i');
    const matcher = (item) => !regex || Object.values(item).some((value) =>
      value instanceof CrudModel
        ? matcher(value) : typeof value === 'string'
        ? value.search(regex) >= 0 : false);

    const items = this.items.filter((item) => matcher(item));
    this.pager.length = items.length;
    this.source.next(items.sort((a, b) => this.sorter.direction === 'asc'
      ? (field(a) || '').localeCompare(field(b) || '')
      : (field(b) || '').localeCompare(field(a) || '')
    ).slice(
      this.pager.pageIndex * this.pager.pageSize,
      (this.pager.pageIndex + 1) * this.pager.pageSize
    ));
  }

  private navigate(params: Params) {
    const { dir, find, page, size, sort, ...rest } = params;
    this.parameters = this.parameters || rest;

    if (JSON.stringify(this.parameters) === JSON.stringify(rest)) {
      this.sorter.direction = dir || null as SortDirection;
      this.searcher.value = find || null;
      this.pager.pageIndex = parseInt(page, 10) || null;
      this.pager.pageSize = parseInt(size, 10) || this.size;
      this.sorter.active = sort || null;
      this.items ? this.filter() : this.fetch();
    }
  }

  private paginate(response: StrictHttpResponse<any>) {
    this.pager.length = response.body.page.totalElements;
    this.pager.pageIndex = response.body.page.number;
    this.pager.pageSize = response.body.page.size;
  }

}
