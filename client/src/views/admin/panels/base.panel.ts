import { AfterViewInit, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatTab, MatTabGroup } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudModel, Pathfinder, Selfrouter } from '@portal/core';
import { ConfirmDialogComponent } from '@portal/forms';
import { Observable } from 'rxjs';
import { filter, mergeMap, skip } from 'rxjs/operators';

export abstract class BasePanel extends Selfrouter implements AfterViewInit {

  public index: number;

  @ViewChild(MatTabGroup)
  public tab: MatTabGroup;

  @ViewChildren(MatTab, { read: ElementRef })
  public tabs: QueryList<ElementRef>;

  public constructor(
    protected pathfinder: Pathfinder,
    protected route: ActivatedRoute,
    protected router: Router,
    private dialog: MatDialog
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    const tabulate = (index) => this.router.navigate([], {
      queryParams: { tab: this.tabs.toArray()[index].nativeElement.id }
    });

    this.tab.selectedIndexChange.pipe(skip(1)).subscribe((i) => tabulate(i));
    this.route.queryParamMap.subscribe((params) => this.index = this.tabs
      .toArray().findIndex((t) => t.nativeElement.id === params.get('tab')));

    if (!this.route.snapshot.queryParamMap.has('tab')) { tabulate(0); }
  }

  public create(alias: string) {
    this.router.navigateByUrl(`/admin/edit/${alias}/new`);
  }

  public delete(item: CrudModel): void {
    this.confirm(item).pipe(
      filter(Boolean),
      mergeMap(() => item.constructor['provider'].delete(item.id)),
    ).subscribe(() => this.reload());
  }

  public update(item: CrudModel): void {
    this.router.navigate(this.pathfinder
      .to(item.constructor['stepper']).concat(item.id));
  }

  protected confirm(item: CrudModel): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: { item: item }
    }).afterClosed();
  }

  protected reload(): void {
    this.router.resetConfig(this.router.config);
    this.router.navigate([], {
      preserveQueryParams: true,
      skipLocationChange: true
    });
  }

}
