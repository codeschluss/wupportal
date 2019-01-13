import { AfterViewInit, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog, MatTab, MatTabGroup } from '@angular/material';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudModel, CrudResolver, Pathfinder, Selfrouter, TokenProvider, TokenResolver } from '@portal/core';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { UserProvider } from '../../../realm/user/user.provider';
import { ClientPackage } from '../../../utils/package';
import { DeleteDialogComponent } from '../dialogs/delete.dialog';

export abstract class BasePanel extends Selfrouter implements AfterViewInit {

  public index: number;

  @ViewChild(MatTabGroup)
  public tab: MatTabGroup;

  @ViewChildren(MatTab, { read: ElementRef })
  public tabs: QueryList<ElementRef>;

  protected abstract path: string;

  protected abstract resolve: object;

  public get activityProvider(): string[] {
    const claim = ClientPackage.config.jwtClaims.activityProvider;
    return this.route.snapshot.data.tokens.access[claim];
  }

  public get organisationAdmin(): string[] {
    const claim = ClientPackage.config.jwtClaims.organisationAdmin;
    return this.route.snapshot.data.tokens.access[claim];
  }

  public get organisationUser(): string[] {
    const claim = ClientPackage.config.jwtClaims.organisationUser;
    return this.route.snapshot.data.tokens.access[claim];
  }

  public get superUser(): boolean {
    const claim = ClientPackage.config.jwtClaims.superUser;
    return this.route.snapshot.data.tokens.access[claim];
  }

  public get userId(): string {
    const claim = ClientPackage.config.jwtClaims.userId;
    return this.route.snapshot.data.tokens.access[claim];
  }

  protected get routing(this: any): Route {
    return {
      path: this.path,
      component: this.constructor,
      resolve: Object.assign({
        tokens: TokenResolver
      }, ...Object.keys(this.resolve).map((key) => ({
        [key]: CrudResolver
      }))),
      data: this.resolve
    };
  }

  public constructor(
    protected dialog: MatDialog,
    protected pathfinder: Pathfinder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider
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

  public edit(item: CrudModel): void {
    this.router.navigate(this.pathfinder
      .to(item.constructor['stepper']).concat(item.id));
  }

  public delete(item: CrudModel): void {
    this.confirm(item).pipe(
      filter(Boolean),
      mergeMap(() => item.constructor['provider'].delete(item.id)),
    ).subscribe(() => this.reload());
  }

  protected confirm(item: CrudModel): Observable<boolean> {
    return this.dialog.open(DeleteDialogComponent, {
      data: { item: item }
    }).afterClosed().pipe(filter(Boolean));
  }

  protected reload(): void {
    this.tokenProvider.refresh().subscribe(() => {
      this.router.resetConfig(this.router.config);
      this.router.navigate([], {
        preserveQueryParams: true,
        skipLocationChange: true
      });
    });
  }

}
