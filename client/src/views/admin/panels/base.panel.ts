import { AfterViewInit, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatTab, MatTabGroup } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudModel, Pathfinder, Selfrouter } from '@portal/core';
import { BaseTable, ConfirmDialogComponent } from '@portal/forms';
import { Observable } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';

export abstract class BasePanel extends Selfrouter implements AfterViewInit {

  public index: number;

  @ViewChild(MatTabGroup)
  public tab: MatTabGroup;

  @ViewChildren(MatTab, { read: ElementRef })
  public tabs: QueryList<ElementRef>;

  public constructor(
    protected pathfinder: Pathfinder,
    protected route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => this.index = this.tabs
      .toArray().findIndex((tab) => tab.nativeElement.id === fragment) || 0);

    this.tab.selectedIndexChange.subscribe((index) => this.router.navigate([], {
      fragment: this.tabs.toArray()[index].nativeElement.id
    }));

    if (!this.route.snapshot.fragment) {
      this.router.navigate([], {
        fragment: this.tabs.toArray()[0].nativeElement.id
      });
    }
  }

  public delete(table: BaseTable<CrudModel>, item: CrudModel): void {
    this.confirm(item).pipe(
      filter(Boolean),
      mergeMap(() => item.constructor['provider'].delete(item.id)),
      tap(() => table.remove(item))
    ).subscribe();
  }

  public edit(item: CrudModel): void {
    this.router.navigate(this.pathfinder
      .to(item.constructor['stepper']).concat(item.id));
  }

  protected confirm(item: CrudModel): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: { item: item }
    }).afterClosed();
  }

}
