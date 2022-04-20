import { AfterViewInit, ContentChildren, Directive, HostBinding, Input, OnInit, QueryList, Type, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, mergeMap, tap } from 'rxjs/operators';
import { CrudJoiner, CrudModel, CrudResolver, StrictHttpResponse } from '../../../core';

export interface TableColumn {
  name: string;
  value: (item) => string;
}

@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BaseTable<Model extends CrudModel>
  implements OnInit, AfterViewInit {

  public abstract columns: TableColumn[];

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  @HostBinding('attr.base')
  public readonly base: string = 'table';

  public collate: string[] = [];

  public size: number = 10;

  public source: BehaviorSubject<Model[]>;

  @Input()
  public items: Model[];

  @ViewChild(MatPaginator, { static: true })
  private pager: MatPaginator;

  @ViewChild(MatInput, { static: true })
  private searcher: MatInput;

  @ViewChild(MatSort, { static: true })
  private sorter: MatSort;

  @ViewChild(MatTable, { static: true })
  private table: MatTable<CrudModel>;

  @ContentChildren(MatColumnDef)
  private views: QueryList<MatColumnDef>;

  protected static template(template: string): string {
    return template + `
      <mat-form-field>
        <input matInput type="search">
      </mat-form-field>
      <mat-table matSort [dataSource]="source.asObservable()">
        <mat-header-row *matHeaderRowDef="collate"></mat-header-row>
        <mat-row *matRowDef="let item; columns: collate"></mat-row>
        <ng-container [matColumnDef]="col.name" *ngFor="let col of columns">
          <mat-header-cell mat-sort-header *matHeaderCellDef>
            <ng-container *ngTemplateOutlet="label; context: { case: col }">
            </ng-container>
          </mat-header-cell>
          <mat-cell *matCellDef="let item">
            <slot [innerHTML]="col.value(item)"></slot>
          </mat-cell>
        </ng-container>
        <ng-content></ng-content>
      </mat-table>
      <mat-paginator
        [pageSize]="size"
        [pageSizeOptions]="[10, 25, 50]">
      </mat-paginator>
    `;
  }

  public constructor(
    private crudResolver: CrudResolver,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.source = new BehaviorSubject<Model[]>([]);
    this.items ||= this.route.snapshot.data.items;
    this.route.queryParams.subscribe((params) => this.navigate(params));
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
    const graph = this.joiner.graph;
    const provider = (this.model as any).provider.system;

    provider.call(provider.methods.readAll, {
      dir: this.sorter.direction,
      embeddings: CrudJoiner.to(graph),
      filter: this.searcher.value,
      page: this.pager.pageIndex,
      size: this.pager.pageSize,
      sort: this.sorter.active
    }).pipe(
      tap((response) => this.paginate(response as StrictHttpResponse<any>)),
      map((response) => provider.cast(response)),
      mergeMap((items) => this.crudResolver.refine(items as any, graph))
    ).subscribe((items) => this.source.next(items), () => this.source.next([]));
  }

  private filter(): void {
    const column = this.columns.find((c) => c.name === this.sorter.active);
    const field = column ? column.value : (item) => item[this.sorter.active];
    const items = this.searcher.value ? this.search() as Model[] : this.items;

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
    const { dir, find, page, size, sort } = params;
    this.sorter.direction = dir || null as SortDirection;
    this.searcher.value = find || null;
    this.pager.pageIndex = parseInt(page, 10) || null;
    this.pager.pageSize = parseInt(size, 10) || this.size;
    this.sorter.active = sort || null;
    this.items ? this.filter() : this.fetch();
  }

  private paginate(response: StrictHttpResponse<any>) {
    this.pager.length = response.body.page.totalElements;
    this.pager.pageIndex = response.body.page.number;
    this.pager.pageSize = response.body.page.size;
  }

  private search(item?: CrudModel, path: CrudModel[] = []): Model[] | boolean {
    if (!item) {
      return this.items.filter((i) => this.search(i));
    }

    return Object.values(item).some((value) => {
      switch (true) {
        case typeof value === 'string':
          return value.search(new RegExp(this.searcher.value, 'i')) >= 0;

        case value instanceof CrudModel && !path.includes(value):
          return this.search(value, path.concat(value));
      }
    });
  }

}
