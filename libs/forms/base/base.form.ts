import { Input, OnDestroy, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
            <label [for]="field.name">
              <ng-container *ngTemplateOutlet="label; context: { case: field }">
              </ng-container>
              <ng-container *ngIf="required(field)">*</ng-container>
            </label>
            <span>
              <base-field [field]="field" [group]="group"></base-field>
            </span>
          </section>
        </ng-container>
      </form>
    `;
  }

  public get valid(): boolean {
    return this.group.valid;
  }

  public constructor(
    protected route: ActivatedRoute,
    private builder: FormBuilder
  ) { }

  public ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.group = this.group || data.group || this.builder.group({ });
    this.item = this.item || data.item || new this.model();
    this.route.routeConfig.data.persist = this.persist.bind(this);
    this.fields = this.fields.map((field) => Object.assign(field, {
      label: field.label || 'name',
      options: field.options || data[field.name],
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

  public persist(item: Model = this.item): Observable<any> {
    Object.keys(this.group.controls)
      .filter((key) => !this.fields.find((field) => field.name === key).model)
      .forEach((key) => item[key] = this.value(key));

    return !this.model['provider'] ? of(item) : item.id
      ? this.model['provider'].update(item, item.id)
      : this.model['provider'].create(item);
  }

  public required(field: FormField): boolean {
    return field.tests && field.tests.includes(Validators.required);
  }

  public value(field: string): any {
    const control = this.group.get(field);
    return control ? control.value : this.item[field];
  }

  protected ngPostInit(): void { }

  protected form(field: FormField): void {
    this.group.addControl(field.name, this.builder.control({
      disabled: field.locked,
      value: field.value
    }, field.tests));
  }

  protected select(key: string): { link: CrudModel[], unlink: CrudModel[] } {
    const items = (this.item[key] || []).filter((item) => item.id);
    const values = (this.value(key) || []).filter((value) => value.id);

    return {
      link: values.filter((v) => !items.some((i) => i.id === v.id))
        .concat(values.filter((value) => !value.id)),
      unlink: items.filter((i) => !values.some((v) => v.id === i.id))
    };
  }

}
