import { OnDestroy, OnInit, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, SessionResolver } from '@portal/core';
import { BaseForm } from './base.form';

export interface FormStep {
  field: string;
  form: Type<BaseForm<CrudModel>>;
}

export abstract class BaseStepper<Model extends CrudModel>
  implements OnInit, OnDestroy {

  public abstract root: string;

  public abstract steps: FormStep[];

  protected abstract builder: FormBuilder;

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected abstract route: ActivatedRoute;

  protected abstract router: Router;

  public static get routing(this: any): Route {
    const self = new this();

    return {
      path: `${self.root}/:uuid`,
      component: this,
      resolve: {
        item: CrudResolver,
        session: SessionResolver
      },
      data: {
        item: self.joiner
      }
    };
  }

  protected static template(template: string): string {
    return `
      <nav mat-tab-nav-bar>
        <ng-container *ngFor="let step of steps">
          <a mat-tab-link [disabled]="!isValid" [routerLink]="step.field"
            #tab="routerLinkActive" routerLinkActive [active]="tab.isActive">
            {{ step.field }}
          </a>
        </ng-container>
      </nav>

      <router-outlet></router-outlet>

      <ng-container *ngIf="hasPrev">
        <button mat-button [disabled]="!isValid" [routerLink]="get(-1)?.field">
          <i18n i18n="@@prevForm">prevForm</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="hasNext">
        <button mat-button [disabled]="!isValid" [routerLink]="get(+1)?.field">
          <i18n i18n="@@nextForm">nextForm</i18n>
        </button>
      </ng-container>
      <ng-container *ngIf="hasSave">
        <button mat-button [disabled]="!isValid" (click)="save()">
          <i18n i18n="@@saveForms">saveForms</i18n>
        </button>
      </ng-container>
    `;
  }

  public get hasNext() {
    return this.steps.indexOf(this.get()) < this.steps.length - 1;
  }

  public get hasPrev() {
    return this.steps.indexOf(this.get()) > 0;
  }
  public get hasSave() {
    return this.steps.indexOf(this.get()) === this.steps.length - 1;
  }

  public get isValid(): boolean {
    return this.route.snapshot.routeConfig.children
        .every((child) => child.data.group.valid);
  }

  public ngOnInit(): void {
    if (!this.route.snapshot.routeConfig.children) {
      this.router.config = this.router.config
        .map((route) => this.walker(route, this.routes()));
    }

    if (!this.route.snapshot.children.length) {
      this.router.navigate([this.get().field], { relativeTo: this.route });
    }
  }

  public ngOnDestroy(): void {
    this.router.config = this.router.config
      .map((route) => this.walker(route, []));
  }

  public get(index: number = 0): FormStep {
    if (this.route.snapshot.firstChild) {
      index = index + this.steps.findIndex((step) =>
        step.field === this.route.snapshot.firstChild.routeConfig.path);
    }

    return this.steps[index];
  }

  public save(): void {
    this.route.snapshot.routeConfig.children
      .forEach((i) => console.log(i.data.group.value));
  }

  private routes(): Route[] {
    return this.steps.map((step) => {
      const form = new step.form();
      const fields = form.fields.filter((field) => field.model);

      return {
        path: `${step.field}`,
        component: step.form,
        resolve: fields.reduce((obj, field) => Object.assign(obj, {
          [field.name]: CrudResolver,
        }), { }),
        data: Object.assign({
          group: this.builder.group({ }),
          item: step.field === this.root
            ? this.route.snapshot.data.item
            : this.route.snapshot.data.item[step.field],
          session: this.route.snapshot.data.session
        }, ...fields.map((field) => ({
          [field.name]: CrudJoiner.of(field.model, { filter: null })
        })))
      };
    });
  }

  private walker(route: Route, children: Route[]): Route {
    if ((route['_loadedConfig'] || { }).routes) {
      route['_loadedConfig'].routes = route['_loadedConfig'].routes
        .map((child) => this.walker(child, children));
    } else if (route.children) {
      route.children = route.children
        .map((child) => this.walker(child, children));
    } else if (route.component === this.constructor) {
      route.children = children;
    }

    return route;
  }

}
