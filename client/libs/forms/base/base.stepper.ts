import { Location } from '@angular/common';
import { OnDestroy, OnInit, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, Selfrouter, TokenResolver } from '@portal/core';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { BaseForm } from './base.form';

export interface FormStep {
  name: string;
  form: Type<BaseForm<CrudModel>>;
}

export abstract class BaseStepper<Model extends CrudModel> extends Selfrouter
  implements OnInit, OnDestroy {

  public abstract root: string;

  public abstract steps: FormStep[];

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected static template(template: string): string {
    return template + `
      <nav mat-tab-nav-bar>
        <ng-container *ngFor="let step of steps; let i = index">
          <a mat-tab-link replaceUrl [disabled]="!can(i)" [routerLink]="link(i)"
            #tab="routerLinkActive" routerLinkActive [active]="tab.isActive">
            <ng-container *ngTemplateOutlet="label; context: { case: step }">
            </ng-container>
          </a>
        </ng-container>
        <span style="flex-grow: 1;"></span>
        <a mat-tab-link (click)="quit()">
          <i18n i18n="@@close">close</i18n>
        </a>
      </nav>

      <router-outlet></router-outlet>

      <ng-container *ngIf="hasPrev">
        <button mat-button replaceUrl
          [disabled]="!valid" [routerLink]="link('-1')">
          <i18n i18n="@@prevForm">prevForm</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="hasNext">
        <button mat-button replaceUrl
          [disabled]="!valid" [routerLink]="link('+1')">
          <i18n i18n="@@nextForm">nextForm</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="hasSave">
        <button mat-button color="primary"
          [disabled]="!valid" (click)="persist()">
          <i18n i18n="@@persist">persist</i18n>
        </button>
      </ng-container>
    `;
  }

  public get hasNext(): boolean { return this.index < this.steps.length - 1; }
  public get hasPrev(): boolean { return this.index > 0; }
  public get hasSave(): boolean { return this.index === this.steps.length - 1; }

  public get index(): number {
    return this.route.snapshot.firstChild ? this.steps.findIndex((step) =>
      step.name === this.route.snapshot.firstChild.routeConfig.path) : 0;
  }

  public get item(): Model {
    return this.route.snapshot.data.item;
  }

  public get valid(): boolean {
    const children = this.route.snapshot.routeConfig.children;
    return children[this.index] && children[this.index].data.group.valid;
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

  public constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    private builder: FormBuilder,
    private location: Location,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.router.config = this.walk(this.router.config, this.routes());
    this.router.navigate([this.steps[this.index].name], {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  public ngOnDestroy(): void {
    this.router.config = this.walk(this.router.config, []);
  }

  public can(index: number): boolean {
    return index <= this.index;
  }

  public link(index: number | string): string {
    if (typeof index === 'string') { index = parseInt(index, 10) + this.index; }
    return this.steps[index].name;
  }

  public persist(): void {
    const routes = this.route.snapshot.routeConfig.children;
    const root = routes.find((child) => child.path === this.root);

    forkJoin(...routes.filter((r) => r.path !== this.root).map((route) =>
      route.data.persist().pipe(map((item) => ({ [route.path]: item })))
    )).pipe(
      map((items) => items.reduce((a, b) => Object.assign(a, b))),
      mergeMap((items) => root.data.persist(this.prepare(items)))
    ).subscribe((item) => console.log('OUT', item));
  }

  public quit(): void {
    this.location.back();
  }

  protected prepare(items: { [field: string]: CrudModel }): Model {
    return Object.assign(this.item, items);
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
          group: this.builder.group({ }),
          item: step.name === this.root
            ? this.route.snapshot.data.item
            : this.route.snapshot.data.item[step.name],
          tokens: this.route.snapshot.data.tokens
        }, ...fields.map((field) => ({
          [field.name]: CrudJoiner.of(field.model, { filter: null })
        })))
      };
    });
  }

}
