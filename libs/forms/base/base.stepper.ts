import { Location } from '@angular/common';
import { AfterViewInit, HostBinding, Input, OnDestroy, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, I18nComponent, Selfrouter, Title, TokenResolver } from '@wooportal/core';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { BaseForm } from './base.form';

export interface FormStep {
  name: string;
  form: Type<BaseForm<CrudModel>>;
}

export abstract class BaseStepper<Model extends CrudModel> extends Selfrouter
  implements OnInit, AfterViewInit, OnDestroy {

  public abstract root: string;

  public abstract steps: FormStep[];

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  @HostBinding('class')
  public class: string = 'base-stepper';

  @Input()
  public item: Model;

  @ViewChildren(I18nComponent)
  private translations: QueryList<I18nComponent>;

  protected static template(template: string): string {
    return `
      <header class="mat-title">
        <ng-container *ngTemplateOutlet="label; context: {
          case: { name: item?.id ? 'edit' : 'create' }
        }"></ng-container>
      </header>
      <h1 class="mat-headline">{{ title || '...' }}</h1>
      <nav mat-tab-nav-bar>
        <ng-container *ngFor="let step of steps; let i = index">
          <a mat-tab-link replaceUrl routerLinkActive
            #tab="routerLinkActive"
            [disabled]="!can(i)"
            [routerLink]="link(i)"
            [active]="tab.isActive">
            <ng-container *ngTemplateOutlet="label; context: { case: step }">
            </ng-container>
          </a>
        </ng-container>
      </nav>
      ${template}
      <router-outlet></router-outlet>
      <mat-divider></mat-divider>
      <button mat-raised-button color="warn" tabindex="-1" (click)="quit()">
        <i18n i18n="@@close">close</i18n>
      </button>
      <button mat-raised-button color="warn" tabindex="-1" (click)="reset()">
        <i18n i18n="@@reset">reset</i18n>
      </button>
      <ng-container *ngIf="has('-1')">
        <button mat-raised-button replaceUrl
          [disabled]="!can(index - 1)"
          [routerLink]="link('-1')">
          <i18n i18n="@@previous">previous</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="has('+1')">
        <button mat-raised-button replaceUrl
          [disabled]="!can(index + 1)"
          [routerLink]="link('+1')">
          <i18n i18n="@@next">next</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="!has('+1')">
        <button mat-raised-button
          color="primary"
          [disabled]="!valid || !dirty"
          (click)="persist()">
          <i18n i18n="@@persist">persist</i18n>
        </button>
      </ng-container>
    `;
  }

  public get dirty(): boolean {
    const routes = this.route.snapshot.routeConfig.children;
    return routes.some((route) => route.data.form && route.data.form.dirty);
  }

  public get index(): number {
    return !this.route.snapshot.firstChild ? 0 : this.steps.findIndex((step) =>
      step.name === this.route.snapshot.firstChild.routeConfig.path);
  }

  public get title(): string {
    const data = this.route.snapshot.routeConfig.children[0].data;
    return data.form && data.form.group.get('name').value;
  }

  public get valid(): boolean {
    const routes = this.route.snapshot.routeConfig.children;
    return routes.every((route) => route.data.form && route.data.form.valid);
  }

  protected get routing(this: any): Route {
    Object.defineProperty(this.model, 'stepper', {
      configurable: true,
      value: this
    });

    return {
      path: `${this.root}/:uuid`,
      component: this.constructor,
      resolve: {
        item: CrudResolver,
        tokens: TokenResolver
      },
      data: {
        item: this.joiner
      }
    };
  }

  public constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    private location: Location,
    private titleService: Title
  ) {
    super();
  }

  public ngOnInit(): void {
    this.item = this.item
      || this.route.snapshot.data.item
      || new this.model();

    this.router.config = this.walk(this.router.config, this.routes());
    this.router.navigate([this.steps[this.index].name], {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  public ngAfterViewInit(): void {
    this.titleService.set(this.translations.first.text);
  }

  public ngOnDestroy(): void {
    this.router.config = this.walk(this.router.config, null);
  }

  public can(index: number): boolean {
    const route = this.route.snapshot.routeConfig.children[this.index];
    const valid = route && route.data.form && route.data.form.valid;
    return index <= this.index || (--index === this.index && valid);
  }

  public has(index: number | string): boolean {
    index = typeof index === 'string' ? parseInt(index, 10) : index;
    return index > 0 ? this.index < this.steps.length - 1 : this.index > 0;
  }

  public link(index: number | string): string {
    return typeof index === 'string'
      ? this.steps[parseInt(index, 10) + this.index].name
      : this.steps[index].name;
  }

  public quit(): void {
    this.location.back();
  }

  public reset(): void {
    const route = this.route.snapshot.routeConfig.children[this.index];
    if (route && route.data.form) { route.data.form.reset(); }
  }

  protected persist(): void {
    const routes = this.route.snapshot.routeConfig.children;
    const root = routes.find((route) => route.path === 'main');
    const control = (field, value) => root.data
      .group.addControl(field, new FormControl(value));

    forkJoin([of(0)].concat(routes.filter((r) => r !== root).map((route) =>
      route.data.form.persist().pipe(map((item) => [route.path, item]))
    ))).pipe(
      tap((items) => items.slice(1).forEach((i) => control(i[0], i[1]))),
      mergeMap(() => root.data.form.persist())
    ).subscribe(() => this.location.back());
  }

  private routes(): Route[] {
    return this.steps.map((step) => {
      const fields = new step.form().fields.filter((field) => field.model);

      return {
        path: step.name,
        component: step.form,
        resolve: fields.reduce((obj, field) => Object.assign(obj, {
          [field.name]: CrudResolver,
        }), { }),
        data: Object.assign({
          group: new FormGroup({ }),
          item: step.name === 'main' ? this.item : this.item[step.name],
          tokens: this.route.snapshot.data.tokens
        }, ...fields.map((field) => ({
          [field.name]: CrudJoiner.of(field.model, { filter: null })
        })))
      };
    });
  }

}
