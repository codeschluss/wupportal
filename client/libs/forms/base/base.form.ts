import { HostBinding, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudModel } from '@portal/core';
import { Observable, of } from 'rxjs';
import { BaseFieldComponent } from './base.field';
import { BaseStepper } from './base.stepper';

export interface FormField {
  name: string;
  input: Type<BaseFieldComponent>;
  label?: string;
  locked?: boolean;
  model?: Type<CrudModel>;
  multi?: boolean;
  options?: CrudModel[];
  tests?: ValidatorFn[];
  type?: string;
  value?: any;
}

export abstract class BaseForm<Model extends CrudModel>
  implements OnInit, OnDestroy {

  @HostBinding('class')
  public class: string = 'base-form';

  @Input()
  public group: FormGroup;

  @Input()
  public item: Model;

  public abstract fields: FormField[];

  public abstract model: Type<Model>;

  protected static template(template: string): string {
    return template + `
      <form [formGroup]="group">
        <ng-container *ngFor="let field of fields">
          <section>
            <label class="mat-body-strong" [for]="field.name">
              <ng-container *ngTemplateOutlet="label; context: { case: field }">
              </ng-container>
              <ng-container *ngIf="required(field)">*</ng-container>
            </label>
            <output [for]="field.name">
              <base-field [field]="field" [group]="group"></base-field>
            </output>
          </section>
        </ng-container>
      </form>
    `;
  }

  public get valid(): boolean {
    return this.group.valid;
  }

  public constructor(
    protected route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.item = this.item || this.route.snapshot.data.item || new this.model();
    this.group = this.group || this.route.snapshot.data.group;
    this.route.routeConfig.data.persist = this.persist.bind(this);

    this.fields = this.fields.map((field) => Object.assign(field, {
      label: field.label || 'name',
      options: field.options || this.route.snapshot.data[field.name],
      value: field.value || this.item[field.name]
    }));

    this.ngPostInit();
    this.fields.forEach((field) => this.form(field));
  }

  public ngOnDestroy(): void {
    if (!BaseStepper.isPrototypeOf(this.route.parent.routeConfig.component)) {
      delete this.route.routeConfig.data.persist;
    }
  }

  public required(field: FormField): boolean {
    return field.tests && field.tests.includes(Validators.required);
  }

  protected ngPostInit(): void { }

  protected diff(field: string, items?: { [key: string]: CrudModel }):
    { add: Model[], del: Model[] } {

    const add = (this.value(field, items) || []).filter((item) => !item.id);
    const put = (this.value(field, items) || []).filter((item) => item.id);
    const del = (this.item[field] || []);

    return {
      add: put.filter((v) => !del.some((t) => t.id === v.id)).concat(add),
      del: del.filter((t) => !put.some((v) => v.id === t.id))
    };
  }

  protected persist(items?: { [key: string]: CrudModel }): Observable<any> {
    if (this.group.dirty && this.model['provider']) {
      this.fields.map((field) => field.name).forEach(
        (field) => this.item[field] = this.value(field, items));

      return this.item.id
        ? this.model['provider'].update(this.item, this.item.id)
        : this.model['provider'].create(this.item);
    }

    return of(this.item);
  }

  protected value(field: string, items?: { [key: string]: CrudModel }): any {
    const control = this.group.get(field);
    return items && field in items ? items[field]
      : control ? control.value : this.item[field];
  }

  private form(field: FormField): void {
    this.group.addControl(field.name, new FormControl({
      disabled: field.locked,
      value: field.value
    }, field.tests));
  }

}
