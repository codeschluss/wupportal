import { Location } from '@angular/common';
import { HostBinding, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, Selfrouter, TokenResolver } from '@portal/core';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { BaseForm } from './base.form';

export interface FormStep {
  name: string;
  form: Type<BaseForm<CrudModel>>;
}

export abstract class BaseStepper<Model extends CrudModel> extends Selfrouter
  implements OnInit, OnDestroy {

  @HostBinding('class')
  public class: string = 'base-stepper';

  @Input()
  public item: Model;

  public abstract root: string;

  public abstract steps: FormStep[];

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected static template(template: string): string {
    return template + `
      <h2 class="mat-title"><ng-container *ngTemplateOutlet="label; context: {
        case: { name: item.id ? 'edit' : 'create' }
      }"></ng-container></h2>
      <h1 class="mat-headline">{{ title || '...' }}</h1>
      <nav mat-tab-nav-bar>
        <ng-container *ngFor="let step of steps; let i = index">
          <a mat-tab-link replaceUrl [disabled]="!can(i)" [routerLink]="link(i)"
            #tab="routerLinkActive" routerLinkActive [active]="tab.isActive">
            <ng-container *ngTemplateOutlet="label; context: { case: step }">
            </ng-container>
          </a>
        </ng-container>
      </nav>
      <router-outlet></router-outlet>
      <mat-divider></mat-divider>
      <ng-container *ngIf="hasPrev">
        <button mat-button replaceUrl
          [disabled]="!can(index - 1)" [routerLink]="link('-1')">
          <i18n i18n="@@prevForm">prevForm</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="hasNext">
        <button mat-button replaceUrl
          [disabled]="!can(index + 1)" [routerLink]="link('+1')">
          <i18n i18n="@@nextForm">nextForm</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="!hasNext">
        <button mat-button color="primary"
          [disabled]="!valid || pristine" (click)="persist()">
          <i18n i18n="@@persistForm">persistForm</i18n>
        </button>
      </ng-container>
      <button mat-button color="warn" style="float: left;"
        (click)="location.back()">
        <i18n i18n="@@close">close</i18n>
      </button>
    `;
  }

  public get hasNext(): boolean { return this.index < this.steps.length - 1; }
  public get hasPrev(): boolean { return this.index > 0; }

  public get index(): number {
    return !this.route.snapshot.firstChild ? 0 : this.steps.findIndex(
      (step) => step.name === this.route.snapshot.firstChild.routeConfig.path);
  }

  public get pristine(): boolean {
    const routes = this.route.snapshot.routeConfig.children;
    return !routes.some((route) => route.data.group.dirty);
  }

  public get title(): string {
    return this.values[this.root].name;
  }

  public get valid(): boolean {
    const routes = this.route.snapshot.routeConfig.children;
    return routes[this.index] && routes[this.index].data.group.valid;
  }

  protected get routing(this: any): Route {
    Object.defineProperty(this.model, 'stepper', { value: this.constructor });

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

  protected get values(): object {
    return this.route.snapshot.routeConfig.children
      .map((route) => ({ [route.path]: route.data.group.getRawValue() }))
      .reduce((a, b) => Object.assign(a, b));
  }

  public constructor(
    public location: Location,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.item = this.item || this.route.snapshot.data.item || new this.model();
    this.router.config = this.walk(this.router.config, this.routes());
    this.router.navigate([this.steps[this.index].name], {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  public ngOnDestroy(): void {
    this.router.config = this.walk(this.router.config, null);
  }

  public can(index: number): boolean {
    return index <= this.index || (--index === this.index && this.valid);
  }

  public link(index: number | string): string {
    if (typeof index === 'string') { index = parseInt(index, 10) + this.index; }
    return this.steps[index].name;
  }

  protected persist(): void {
    const routes = this.route.snapshot.routeConfig.children;
    const root = routes.find((route) => route.path === this.root);

    forkJoin([of({ })].concat(routes.filter((route) => route !== root).map(
      (route) => route.data.persist().pipe(map((item) => ({
        [route.path]: item
      })), tap(() => route.data.group.markAsPristine()))
    ))).pipe(
      map((items) => items.reduce((a, b) => Object.assign(a, b))),
      mergeMap((items) => root.data.persist(items)),
      tap(() => root.data.group.markAsPristine())
    ).subscribe(() => this.location.back());
  }

  private routes(): Route[] {
    return this.steps.map((step) => {
      const form = new step.form();
      const fields = form.fields.filter((field) => field.model);

      return {
        path: `${step.name}`,
        component: step.form,
        resolve: fields.reduce((obj, field) => Object.assign(obj, {
          [field.name]: CrudResolver,
        }), { }),
        data: Object.assign({
          group: new FormGroup({ }),
          item: step.name === this.root ? this.item : this.item[step.name],
          tokens: this.route.snapshot.data.tokens
        }, ...fields.map((field) => ({
          [field.name]: CrudJoiner.of(field.model, { filter: null })
        })))
      };
    });
  }

}
