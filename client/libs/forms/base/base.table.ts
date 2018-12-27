import { AfterViewInit, ContentChildren, Input, QueryList, Type, ViewChild } from '@angular/core';
import { MatColumnDef, MatPaginator, MatSort, MatTable } from '@angular/material';
import { Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, Pathfinder, StrictHttpResponse } from '@portal/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

export interface TableColumn {
  name: string;
  sort?: boolean;
  value: (item) => string;
}

export abstract class BaseTable<Model extends CrudModel>
  implements AfterViewInit {

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

  private data: Model[];

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
    private pathfinder: Pathfinder,
    private resolver: CrudResolver,
    private router: Router
  ) { }

  public ngAfterViewInit(): void {
    this.data = this.items;
    this.sorter.disableClear = true;
    this.views.forEach((view) => this.table.addColumnDef(view));
    this.collate = [
      ...this.columns.map((column) => column.name),
      ...this.views.map((def) => def.name)
    ];

    merge(
      of(null),
      this.pager.page,
      this.sorter.sortChange.pipe(tap(() => this.pager.pageIndex = 0))
    ).subscribe(() => this.reload());
  }

  public delete(item: Model): Observable<any> {
    return this.model['provider'].delete(item.id).pipe(tap(() => {
      if (this.data) {
        this.data.splice(this.data.indexOf(item), 1);
      }

      this.reload();
    }));
  }

  public edit(item: Model): void {
    this.router.navigate(this.pathfinder
      .to(this.model['stepper']).concat(item.id));
  }

  public reload(): void {
    this.data ? this.relist() : this.recall();
  }

  private recall(): void {
    const provider = this.model['provider'].system;
    provider.call(provider.methods.readAll, {
      dir: this.sorter.direction,
      embeddings: CrudJoiner.to(this.joiner.graph),
      filter: '',
      page: this.pager.pageIndex,
      size: this.pager.pageSize,
      sort: this.sorter.active
    }).pipe(
      tap((response) => this.page(response as any)),
      map((response) => provider.cast(response)),
      mergeMap((items) => this.resolver.refine(items as any, this.joiner.graph))
    ).subscribe((items) => this.source.next(items));
  }

  private relist(): void {
    this.pager.length = this.data.length;
    this.source.next((this.sort(this.data)).slice(
      this.pager.pageIndex * this.pager.pageSize,
      (this.pager.pageIndex + 1) * this.pager.pageSize
    ));
  }

  private sort(items: Model[]): Model[] {
    const column = this.columns.find((c) => c.name === this.sorter.active);
    const value = column ? column.value : (item) => item[this.sorter.active];

    return items.sort((a, b) => this.sorter.direction === 'asc'
      ? (value(a) || '').localeCompare(value(b) || '')
      : (value(b) || '').localeCompare(value(a) || ''));
  }

  private page(response: StrictHttpResponse<any>) {
    this.pager.length = response.body.page.totalElements;
    this.pager.pageIndex = response.body.page.number;
    this.pager.pageSize = response.body.page.size;
  }

}
