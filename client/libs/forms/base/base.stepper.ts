import { OnDestroy, OnInit, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, SessionResolver } from '@portal/core';
import { Observable, of } from 'rxjs';
import { BaseForm } from './base.form';

export interface FormStep {
  name: string;
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
    self.model = self.stepped(self.model);

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
    return template + `
      <nav mat-tab-nav-bar>
        <ng-container *ngFor="let step of steps; let i = index">
          <a mat-tab-link [disabled]="!isValid" (click)="goto(i)"
            #tab="routerLinkActive" routerLinkActive [active]="tab.isActive">
            <ng-container *ngTemplateOutlet="label; context: { case: step }">
            </ng-container>
          </a>
        </ng-container>
      </nav>

      <router-outlet></router-outlet>

      <ng-container *ngIf="hasPrev">
        <a mat-button [disabled]="!isValid" (click)="jump(-1)">
          <i18n i18n="@@prevForm">prevForm</i18n>
        </a>
      </ng-container>
      <ng-container *ngIf="hasNext">
        <a mat-button [disabled]="!isValid" (click)="jump(+1)">
          <i18n i18n="@@nextForm">nextForm</i18n>
        </a>
      </ng-container>
      <ng-container *ngIf="hasSave">
        <button mat-button [disabled]="!isValid" (click)="save()">
          <i18n i18n="@@saveForms">saveForms</i18n>
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

  public get isValid(): boolean {
    return this.route.snapshot.routeConfig.children
        .every((child) => child.data.group.valid);
  }

  public ngOnInit(): void {
    if (!this.route.snapshot.routeConfig.children) {
      this.router.config = this.router.config
        .map((route) => this.walk(route, this.routes()));
    }

    if (!this.route.snapshot.children.length) { this.goto(0); }
  }

  public ngOnDestroy(): void {
    this.router.config = this.router.config
      .map((route) => this.walk(route, []));
  }

  public goto(index): void {
    this.router.navigate([this.steps[index].name], {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  public jump(index: number = 0): void {
    if (this.route.snapshot.firstChild) {
      index = index + this.steps.findIndex((step) =>
        step.name === this.route.snapshot.firstChild.routeConfig.path);
    }

    this.goto(index);
  }

  public save(): Observable<any> {
    return of(this.route.snapshot.routeConfig.children
      .forEach((i) => console.log(i.data.group.value)));
  }

  protected stepped(model: Type<Model>): Type<Model> {
    return Object.defineProperty(model, 'stepper', { value: this.constructor });
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
          session: this.route.snapshot.data.session
        }, ...fields.map((field) => ({
          [field.name]: CrudJoiner.of(field.model, { filter: null })
        })))
      };
    });
  }

  private walk(route: Route, children: Route[]): Route {
    if ((route['_loadedConfig'] || { }).routes) {
      route['_loadedConfig'].routes = route['_loadedConfig'].routes
        .map((child) => this.walk(child, children));
    } else if (route.children) {
      route.children = route.children
        .map((child) => this.walk(child, children));
    } else if (route.component === this.constructor) {
      route.children = children;
    }

    return route;
  }

}
