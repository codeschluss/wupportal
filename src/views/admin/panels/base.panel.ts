import { AfterViewInit, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Box, CrudModel, CrudResolver, I18nComponent, Pathfinder, Selfrouter, Title, TokenProvider, TokenResolver } from '@wooportal/core';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { OrganisationModel } from '../../../realm/models/organisation.model';
import { ProviderModel } from '../../../realm/models/provider.model';
import { UserModel } from '../../../realm/models/user.model';
import { UserProvider } from '../../../realm/providers/user.provider';
import { ClientPackage } from '../../../utils/package';
import { DeleteDialogComponent } from '../dialogs/delete.dialog';

export abstract class BasePanel extends Selfrouter implements AfterViewInit {

  protected abstract path: string;

  protected abstract resolve: object;

  public index: number;

  @ViewChild(MatTabGroup, { static: true })
  private tab: MatTabGroup;

  @ViewChildren(MatTab, { read: ElementRef })
  private tabs: QueryList<ElementRef<HTMLElement>>;

  @ViewChildren(I18nComponent)
  private translations: QueryList<I18nComponent>;

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

  public get title(): string {
    return this.translations.first.text;
  }

  public get userId(): string {
    const claim = ClientPackage.config.jwtClaims.userId;
    return this.route.snapshot.data.tokens.access[claim];
  }

  protected get routing(this: any): Route {
    return {
      path: this.path,
      resolve: Object.assign({
        tokens: TokenResolver
      }, ...Object.keys(this.resolve).map((key) => ({
        [key]: CrudResolver
      }))),
      data: {
        resolve: this.resolve
      }
    };
  }

  public constructor(
    protected dialog: MatDialog,
    protected pathfinder: Pathfinder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    private titleService: Title
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    const tabs = this.tabs.toArray();
    const id = (index) => tabs[index].nativeElement.id;

    this.titleService.set(this.title);

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
    this.router.navigate(['/', 'admin', 'edit', alias, 'new']);
  }

  public delete(item: CrudModel): void {
    this.confirm(item).pipe(
      filter(Boolean),
      mergeMap(() => item.constructor['provider'].delete(item.id)),
    ).subscribe(() => this.reload());
  }

  public edit(item: CrudModel): void {
    const stepper = item.constructor['stepper'].constructor;
    this.router.navigate(this.pathfinder.to(stepper).concat(item.id));
  }

  public grantBlogger(item: UserModel, grant: boolean): void {
    UserModel['provider'].grantBlogger(
      item.id,
      Box(grant)
    ).subscribe(() => this.reload());
  }

  public grantOrganisation(item: OrganisationModel, grant: boolean): void {
    OrganisationModel['provider'].grantOrganisationAdmin(
      item.id,
      Box(grant)
    ).subscribe(() => this.reload());
  }

  public grantOrganisationAdmin(item: ProviderModel, grant: boolean): void {
    OrganisationModel['provider'].grantOrganisationAdmin(
      item.organisation.id,
      item.user.id,
      Box(grant)
    ).pipe(
      filter(() => item.user.id === this.userId)
    ).subscribe(() => this.reload());
  }

  public grantOrganisationUser(item: ProviderModel, grant: boolean): void {
    OrganisationModel['provider'].grantOrganisationUser(
      item.organisation.id,
      item.user.id,
      Box(grant)
    ).subscribe(() => this.reload());
  }

  public grantSuperUser(item: UserModel, grant: boolean): void {
    UserModel['provider'].grantSuperUser(
      item.id,
      Box(grant)
    ).pipe(
      filter(() => item.id === this.userId)
    ).subscribe(() => this.reload());
  }

  public unlinkBlogger(item: UserModel): void {
    this.confirm(item).pipe(
      mergeMap(() => UserModel['provider'].unlinkBlogger(
        item.id
      ))
    ).subscribe(() => this.reload());
  }

  public unlinkOrganisation(item: OrganisationModel, user: UserModel): void {
    this.confirm(Object.assign(item.provider, {
      organisation: item,
      user
    })).pipe(
      mergeMap(() => UserModel['provider'].unlinkOrganisation(
        this.userId,
        item.id
      ))
    ).subscribe(() => this.reload());
  }

  public unlinkUser(item: ProviderModel): void {
    this.confirm(item).pipe(
      mergeMap(() => OrganisationModel['provider'].unlinkUser(
        item.organisation.id,
        item.user.id
      ))
    ).subscribe(() => this.reload());
  }

  protected confirm(item: CrudModel): Observable<boolean> {
    return this.dialog.open(DeleteDialogComponent, {
      data: { item }
    }).afterClosed().pipe(filter(Boolean)) as Observable<boolean>;
  }

  protected provided(organisation: OrganisationModel): ProviderModel[] {
    const users = organisation.users as any || [];

    return users.map((user) => Object.assign(user.provider, {
      organisation,
      user
    }));
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
