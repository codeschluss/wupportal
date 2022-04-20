import { AfterViewInit, Directive, ElementRef, HostBinding, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { ActivityProvider, BlogpostModel, BlogpostProvider, Box, CoreSettings, CrudJoiner, CrudModel, CrudResolver, LabelComponent, MembershipModel, MessageProvider, MetatagService, OrganisationModel, OrganisationProvider, RoutingComponent, RoutingProvider, TokenProvider, TokenResolver, UserModel, UserProvider } from '../../../core';
import { DeletePopupComponent } from '../popups/delete.popup';
import { PusherPopupComponent } from '../popups/pusher.popup';

@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BasePanel
  extends RoutingComponent
  implements AfterViewInit {

  protected abstract path: string;

  protected abstract resolve: Record<string, CrudJoiner>;

  @HostBinding('attr.base')
  public readonly base: string = 'panel';

  public index: number;

  @ViewChild(MatTabGroup, { static: true })
  private tab: MatTabGroup;

  @ViewChildren(MatTab, { read: ElementRef })
  private tabs: QueryList<ElementRef<HTMLElement>>;

  @ViewChildren(LabelComponent)
  private translations: QueryList<LabelComponent>;

  public get activityProvider(): string[] {
    const claim = this.settings.jwtClaims.activityProvider;
    return this.route.snapshot.data.tokens.access[claim];
  }

  public get organisationAdmin(): string[] {
    const claim = this.settings.jwtClaims.organisationAdmin;
    return this.route.snapshot.data.tokens.access[claim];
  }

  public get organisationUser(): string[] {
    const claim = this.settings.jwtClaims.organisationUser;
    return this.route.snapshot.data.tokens.access[claim];
  }

  public get superUser(): boolean {
    const claim = this.settings.jwtClaims.superUser;
    return this.route.snapshot.data.tokens.access[claim];
  }

  public get title(): string {
    return this.translations.first.text;
  }

  public get userId(): string {
    const claim = this.settings.jwtClaims.userId;
    return this.route.snapshot.data.tokens.access[claim];
  }

  protected get routing(): Route {
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
    protected activityServiceProvider: ActivityProvider,
    protected dialog: MatDialog,
    protected messageProvider: MessageProvider,
    protected organisationProvider: OrganisationProvider,
    protected blogpostProvider: BlogpostProvider,
    protected route: ActivatedRoute,
    protected router: Router,
    protected routingProvider: RoutingProvider,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    private metatagService: MetatagService,
    private settings: CoreSettings
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    const tabs = this.tabs.toArray();
    const id = (index) => tabs[index].nativeElement.id;

    this.metatagService.setTitle(this.title);

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
      mergeMap(() => (item.constructor as any).provider.delete(item.id))
    ).subscribe(() => this.reload());
  }

  public edit(item: CrudModel): void {
    const stepper = (item.constructor as any).stepper.constructor;
    this.router.navigate(this.routingProvider.to(stepper).concat(item.id));
  }

  public grantBlogger(item: UserModel, grant: boolean): void {
    this.userProvider.grantBlogger(
      item.id,
      Box(grant)
    ).subscribe(() => this.reload());
  }

  public grantBlogApproval(item: BlogpostModel, grant: boolean): void {
    this.blogpostProvider.grantApproval(
      item.id,
      Box(grant)
    ).subscribe(() => this.reload());
  }

  public grantOrganisation(item: OrganisationModel, grant: boolean): void {
    this.organisationProvider.grantOrganisation(
      item.id,
      Box(grant)
    ).subscribe(() => this.reload());
  }

  public grantMembership(item: MembershipModel, grant: boolean): void {
    this.organisationProvider.grantMembership(
      item.organisation.id,
      item.user.id,
      Box(grant)
    ).subscribe(() => this.reload());
  }

  public grantOwnership(item: MembershipModel, grant: boolean): void {
    this.organisationProvider.grantOwnership(
      item.organisation.id,
      item.user.id,
      Box(grant)
    ).pipe(
      filter(() => item.user.id === this.userId)
    ).subscribe(() => this.reload());
  }

  public grantSuperUser(item: UserModel, grant: boolean): void {
    this.userProvider.grantSuperUser(
      item.id,
      Box(grant)
    ).pipe(
      filter(() => item.id === this.userId)
    ).subscribe(() => this.reload());
  }

  public grantTranslator(item: UserModel, grant: boolean): void {
    this.userProvider.grantTranslator(
      item.id,
      Box(grant)
    ).pipe(
      filter(() => item.id === this.userId)
    ).subscribe(() => this.reload());
  }

  public push(item: CrudModel): void {
    this.dialog.open(PusherPopupComponent, {
      data: { item }
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap((message: any) => this.messageProvider.push(message))
    ).subscribe();
  }

  public unlinkBlogger(item: UserModel): void {
    this.userProvider.unlinkBlogger(
      item.id
    ).subscribe(() => this.reload());
  }

  public unlinkOrganisation(item: OrganisationModel, user: UserModel): void {
    this.confirm(Object.assign(item.membership, {
      organisation: item,
      user
    })).pipe(
      mergeMap(() => this.userProvider.unlinkOrganisation(
        this.userId,
        item.id
      ))
    ).subscribe(() => this.reload());
  }

  public unlinkUser(item: MembershipModel): void {
    this.confirm(item).pipe(
      mergeMap(() => this.organisationProvider.unlinkUser(
        item.organisation.id,
        item.user.id
      ))
    ).subscribe(() => this.reload());
  }

  protected confirm(item: CrudModel): Observable<boolean> {
    return this.dialog.open(DeletePopupComponent, {
      data: { item }
    }).afterClosed().pipe(filter(Boolean)) as Observable<boolean>;
  }

  protected membership(item: OrganisationModel): MembershipModel[] {
    const users = item.users as UserModel[] || [];

    return users.map((user) => Object.assign(user.membership, {
      organisation: item,
      user
    }));
  }

  protected reload(): void {
    this.tokenProvider.refresh().subscribe(() => {
      this.router.resetConfig(this.router.config);
      this.router.navigate([], {
        queryParamsHandling: 'preserve',
        skipLocationChange: true
      });
    });
  }

}
