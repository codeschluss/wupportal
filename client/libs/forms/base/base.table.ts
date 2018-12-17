import { AfterViewInit, ContentChildren, Input, QueryList, Type, ViewChild } from '@angular/core';
import { MatColumnDef, MatPaginator, MatSort, MatTable } from '@angular/material';
import { CrudJoiner, CrudModel, CrudResolver, Pathfinder, StrictHttpResponse } from '@portal/core';
import { BehaviorSubject, merge, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

export interface TableColumn {
  name: string;
  sort?: boolean;
  value: (item) => string;
}

export abstract class BaseTable<Model extends CrudModel>
  implements AfterViewInit {

  @Input()
  public editable: any;

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

  public source: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>([]);

  public verticals: string[] = [];

  public abstract columns: TableColumn[];

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected static template(template: string): string {
    return template + `
      <mat-table matSort [dataSource]="source.asObservable()">
        <mat-header-row *matHeaderRowDef="verticals"></mat-header-row>
        <mat-row *matRowDef="let item; columns: verticals"></mat-row>
        <ng-container *ngFor="let column of columns">
          <ng-container [matColumnDef]="column.name">
            <mat-header-cell mat-sort-header
              [disabled]="!column.sort" *matHeaderCellDef>
              <ng-container *ngTemplateOutlet="label;
                context: { case: column }">
              </ng-container>
              </mat-header-cell>
            <mat-cell *matCellDef="let item">
              {{ item[column.name] ? column.value(item) : '' }}
            </mat-cell>
          </ng-container>
        </ng-container>
        <ng-content></ng-content>
          <ng-container matColumnDef="actions" *ngIf="!this.readonly">
            <mat-header-cell *matHeaderCellDef>
              <i18n i18n="@@actions">actions</i18n>
            </mat-header-cell>
            <mat-cell *matCellDef="let item">
              <button mat-button [routerLink]="edit(item)">
                <i18n i18n="@@edit">edit</i18n>
              </button>
              <button mat-button [routerLink]="delete(item)">
                <i18n i18n="@@delete">delete</i18n>
              </button>
            </mat-cell>
          </ng-container>
      </mat-table>
      <mat-paginator [pageSize]="10"></mat-paginator>
    `;
  }

  public get readonly(): boolean { return this.editable === undefined; }

  public constructor(
    private pathfinder: Pathfinder,
    private resolver: CrudResolver
  ) { }

  public ngAfterViewInit(): void {
    this.sorter.disableClear = true;
    this.views.forEach((view) => this.table.addColumnDef(view));
    this.verticals = [
      ...this.columns.map((column) => column.name),
      ...this.views.map((def) => def.name),
      ...(this.readonly ? [] : ['actions'])
    ];

    merge(
      of(null),
      this.pager.page,
      this.sorter.sortChange.pipe(tap(() => this.pager.pageIndex = 0))
    ).subscribe(() => this.items ? this.relist() : this.reload());
  }

  public delete(item: CrudModel): string[] {
    return ['.'];
    // return this.walk(item['deleter']);
  }

  public edit(item: CrudModel): string[] {
    return this.pathfinder.to(item.constructor['stepper']).concat(item.id);
  }

  private relist(): void {
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
      embeddings: CrudJoiner.to(this.joiner.graph),
      filter: '',
      page: this.pager.pageIndex,
      size: this.pager.pageSize,
      sort: this.sorter.active
    }).pipe(
      tap((response) => this.scroll(response as any)),
      map((response) => provider.cast(response)),
      mergeMap((items) => this.resolver.refine(items as any, this.joiner.graph))
    ).subscribe((items) => this.source.next(items));
  }

  private scroll(response: StrictHttpResponse<any>) {
    this.pager.length = response.body.page.totalElements;
    this.pager.pageIndex = response.body.page.number;
    this.pager.pageSize = response.body.page.size;
  }

}
