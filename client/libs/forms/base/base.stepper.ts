import { OnInit, Type } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, SessionResolver } from '@portal/core';
import { BaseForm } from './base.form';

export interface FormStep {
  field: string;
  form: Type<BaseForm<CrudModel>>;
}

export abstract class BaseStepper<Model extends CrudModel> implements OnInit {

  public abstract root: string;

  public abstract steps: FormStep[];

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
        entity: CrudResolver,
        session: SessionResolver
      },
      data: {
        entity: self.joiner
      }
    };
  }

  protected static template(template: string): string {
    return `
      <mat-horizontal-stepper linear>
        <ng-container *ngFor="let step of steps" ngProjectAs="mat-step">
          <mat-step [stepControl]="step.group">
            <ng-template matStepLabel>${template}</ng-template>
            <router-outlet></router-outlet>
            <ng-container *ngIf="canPrev(step)">
              <button mat-button matStepperPrevious [routerLink]="doPrev(step)">
                PREV
              </button>
            </ng-container>
            <ng-container *ngIf="canNext(step)">
              <button mat-button matStepperNext [routerLink]="doNext(step)">
                NEXT
              </button>
            </ng-container>
            <ng-container *ngIf="canSave(step)">
              <button mat-button matStepperNext (click)="save()">
                SAVE
              </button>
            </ng-container>
          </mat-step>
        </ng-container>
      </mat-horizontal-stepper>
    `;
  }

  public canNext = (step) => this.steps.indexOf(step) < this.steps.length - 1;
  public canPrev = (step) => this.steps.indexOf(step) !== 0;
  public canSave = (step) => this.steps.indexOf(step) === this.steps.length - 1;
  public doNext = (step) => this.steps[this.steps.indexOf(step) + 1].field;
  public doPrev = (step) => this.steps[this.steps.indexOf(step) - 1].field;

  public ngOnInit(): void {
    if (!this.route.snapshot.children.length) {
      this.router.resetConfig(this.router.config
        .map((route) => this.walker(route, this.routing())));

      this.router.navigate([this.steps[0].field], { relativeTo: this.route });
    }
  }

  public save(): void {
    console.log('SAVE');
  }

  private routing(): Route[] {
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
          entity: step.field === this.root
            ? this.route.snapshot.data.entity
            : this.route.snapshot.data.entity[step.field],
          session: this.route.snapshot.data.session
        }, ...fields.map((field) => ({
          [field.name]: CrudJoiner.of(field.model, false)
        })))
      };
    });
  }

  private walker(route: Route, children: Route[]) {
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
