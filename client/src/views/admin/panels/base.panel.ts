import { AfterViewInit, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatTab, MatTabGroup } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudModel, Pathfinder, Selfrouter } from '@portal/core';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { DeleteDialogComponent } from '../dialogs/delete.dialog';

export abstract class BasePanel extends Selfrouter implements AfterViewInit {

  public index: number;

  @ViewChild(MatTabGroup)
  public tab: MatTabGroup;

  @ViewChildren(MatTab, { read: ElementRef })
  public tabs: QueryList<ElementRef>;

  public constructor(
    protected dialog: MatDialog,
    protected pathfinder: Pathfinder,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    const id = (index) => tabs[index].nativeElement.id;
    const tabs = this.tabs.toArray();

    this.route.queryParams.subscribe((params) => this.index =
      tabs.findIndex((t) => t.nativeElement.id === params.tab));

    this.tab.selectedIndexChange.pipe(
      filter((index) => id(index) !== this.route.snapshot.queryParams.tab)
    ).subscribe((index) => this.router.navigate([], {
      queryParams: { tab: id(index) }
    }));

    if (!this.route.snapshot.queryParams.tab) {
      this.router.navigate([], {
        queryParams: { tab: id(0) },
        replaceUrl: true
      });
    }
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
    return this.dialog.open(DeleteDialogComponent, {
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
