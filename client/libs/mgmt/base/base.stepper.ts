import { Type } from '@angular/core';
import { Route } from '@angular/router';
import { BaseService, CrudJoiner, CrudModel, CrudProvider, CrudResolver, SessionProvider } from '@portal/core';
import { BaseForm } from './base.form';

export interface FormStep {
  form: Type<BaseForm<CrudProvider<BaseService, CrudModel>, CrudModel>>;
}

export abstract class BaseStepper
  <Provider extends CrudProvider<BaseService, Model>, Model extends CrudModel> {

  protected abstract base: string;

  protected abstract model: Type<Model>;

  protected abstract provider: Type<Provider>;

  protected abstract steps: FormStep[];

  public static get route(): Route {
    let joiner = CrudJoiner.of(this.prototype.model);
    const links = (form) => form.model.provider.system.linked
      .filter((link) => form.fields.some((field) => field.name === link.field));

    this.prototype.provider.prototype.system.linked
      .forEach((link) => joiner = joiner.with(link.model));

    return {
      path: `${this.prototype.base}/:uuid`,
      component: this as any,
      children: this.prototype.steps.map((step) => ({
        path: `${step.form.prototype.base}/:uuid`,
        component: step.form,
        resolve: Object.assign({
          session: SessionProvider,
          [this.prototype.base]: CrudResolver
        }, ...links(step.form.prototype).map((link) => ({
          [link.field]: CrudResolver,
        }))),
        data: Object.assign({
          [this.prototype.base]: joiner
        }, ...links(step.form.prototype).map((link) => ({
          [link.field]: CrudJoiner.of(link.model, false),
        })))
      }))
    };
  }

  protected static template(template: string): string {
    return `
      <mat-horizontal-stepper linear #stepper>
        <ng-container *ngFor="let form of forms; let i = index">
          <mat-step [stepControl]="form.group">
            <ng-template matStepLabel>${template}</ng-template>
            <router-outlet></router-outlet>
            <slot *ngIf="i > 0; then prev"></slot>
            <slot *ngIf="i < forms.length - 1; then next; else save"></slot>
          </mat-step>
        </ng-container>
      </mat-horizontal-stepper>

      <ng-template #next>
        <button mat-button matStepperNext>__NEXT</button>
      </ng-template>
      <ng-template #prev>
        <button mat-button matStepperPrevious>__PREV</button>
      </ng-template>
      <ng-template #save>
        <button mat-button matStepperNext (click)="save()">__SAVE</button>
      </ng-template>
    `;
  }

  public get forms():
    Type<BaseForm<CrudProvider<BaseService, CrudModel>, CrudModel>>[] {

    return this.steps.map((step) => step.form);
  }

  public save(): void {
    console.log('SAVE');
  }

}
