import { Location } from '@angular/common';
import { AfterViewInit, Directive, HostBinding, Input, OnDestroy, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CrudJoiner, CrudModel, CrudResolver, LabelComponent, MetatagService, RoutingComponent, TokenResolver } from '../../../core';
import { BaseForm } from './base.form';

export interface FormStep {
  name: string;
  form: Type<BaseForm<CrudModel>>;
}

@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BaseStepper<Model extends CrudModel>
  extends RoutingComponent
  implements OnInit, AfterViewInit, OnDestroy {

  public abstract root: string;

  public abstract steps: FormStep[];

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  @HostBinding('attr.base')
  public readonly base: string = 'stepper';

  @Input()
  public item: Model;

  @ViewChildren(LabelComponent)
  private translations: QueryList<LabelComponent>;

  protected static template(template: string): string {
    return `
      <header class="mat-title">
        <ng-container *ngTemplateOutlet="label; context: {
          case: { name: item?.id ? 'edit' : 'create' }
        }"></ng-container>
        <h2 class="mat-headline">{{ title || '...' }}</h2>
      </header>
      <nav mat-tab-nav-bar>
        <ng-container *ngFor="let step of steps; let i = index">
          <a mat-tab-link routerLinkActive
            #tab="routerLinkActive"
            [disabled]="!can(i)"
            [replaceUrl]="true"
            [routerLink]="[link(i)]"
            [active]="tab.isActive">
            <ng-container *ngTemplateOutlet="label; context: { case: step }">
            </ng-container>
          </a>
        </ng-container>
      </nav>
      ${template}
      <router-outlet></router-outlet>
      <mat-divider></mat-divider>
      <button mat-raised-button color="warn" (click)="quit()">
        <i18n>close</i18n>
      </button>
      <button mat-raised-button color="warn" (click)="reset()">
        <i18n>reset</i18n>
      </button>
      <ng-container *ngIf="has('-1')">
        <button mat-raised-button
          [disabled]="!can(index - 1)"
          [replaceUrl]="true"
          [routerLink]="[link('-1')]">
          <i18n>previous</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="has('+1')">
        <button mat-raised-button
          [replaceUrl]="true"
          [disabled]="!can(index + 1)"
          [routerLink]="[link('+1')]">
          <i18n>following</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="!has('+1')">
        <button mat-raised-button
          color="primary"
          [disabled]="!valid || !dirty"
          (click)="persist()">
          <i18n>persist</i18n>
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

  protected get path(): string {
    return this.root;
  }

  protected get routing(): Route {
    Object.defineProperty(this.model, 'stepper', {
      configurable: true,
      value: this
    });

    return {
      path: `${this.path}/:uuid`,
      resolve: {
        item: CrudResolver,
        tokens: TokenResolver
      },
      data: {
        resolve: {
          item: this.joiner
        }
      }
    };
  }

  public constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    private location: Location,
    private metatagService: MetatagService
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
    this.metatagService.setTitle(this.translations.first.text);
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

  public persist(): void {
    const routes = this.route.snapshot.routeConfig.children;
    const root = routes.find((route) => route.path === 'main');
    const control = (field, value) => root.data
      .group.addControl(field, new FormControl(value));

    forkJoin([of(0)].concat(routes.filter((r) => r !== root).map((route) =>
      route.data.form.persist().pipe(map((item) => [route.path, item]))
    ))).pipe(
      tap((items) => items.slice(1).forEach((i) => control(i[0], i[1]))),
      mergeMap(() => root.data.form.persist())
    ).subscribe(() => this.quit());
  }

  public quit(): void {
    this.location.back();
  }

  public reset(): void {
    const route = this.route.snapshot.routeConfig.children[this.index];
    if (route && route.data.form) { route.data.form.reset(); }
  }

  private routes(): Route[] {
    return this.steps.map((step) => {
      const fields = new step.form().fields.filter((field) => field.model);

      return {
        path: step.name,
        component: step.form,
        resolve: fields.reduce((obj, field) => Object.assign(obj, {
          [field.name]: CrudResolver
        }), { }),
        data: {
          group: new FormGroup({ }),
          tokens: this.route.snapshot.data.tokens,
          item: step.name === 'main' ? this.item : this.item[step.name],
          resolve: fields.reduce((obj, field) => Object.assign(obj, {
            [field.name]: CrudJoiner.of(field.model, { filter: null })
          }), { })
        }
      };
    });
  }

}
