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

  protected diff(key: string): { link: CrudModel[], unlink: CrudModel[] } {
    const items = (this.item[key] || []).filter((item) => item.id);
    const values = (this.value(key) || []).filter((value) => value.id);

    return {
      link: values.filter((v) => !items.some((i) => i.id === v.id))
        .concat(values.filter((value) => !value.id)),
      unlink: items.filter((i) => !values.some((v) => v.id === i.id))
    };
  }

  protected persist(item: Model = this.item): Observable<any> {
    if (this.group.dirty && this.model['provider']) {
      this.fields.filter((field) => !field.model)
        .forEach((field) => item[field.name] = this.value(field.name, item));

      return item.id
        ? this.model['provider'].update(item, item.id)
        : this.model['provider'].create(item);
    }

    return of(item);
  }

  protected value(field: string, item: Model = this.item): any {
    const control = this.group.get(field);
    return control ? control.value : item[field];
  }

  private form(field: FormField): void {
    this.group.addControl(field.name, new FormControl({
      disabled: field.locked,
      value: field.value
    }, field.tests));
  }

}
