import { Input, OnDestroy, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudModel } from '@portal/core';
import { Observable, of } from 'rxjs';
import { BaseFieldComponent } from './base.field';

export interface FormField {
  name: string;
  input: Type<BaseFieldComponent>;
  label?: string;
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
        <mat-list>
          <ng-container *ngFor="let field of fields">
            <mat-list-item>
              <ng-container *ngTemplateOutlet="label; context: { case: field }">
              </ng-container>
              <base-field [field]="field" [group]="group"></base-field>
            </mat-list-item>
          </ng-container>
        </mat-list>
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

    this.fields = this.fields.map((field) => Object.assign(field, {
      label: field.label || 'name',
      options: field.options || data[field.name],
      value: field.value || this.item[field.name]
    }));

    this.ngPostInit();
    this.route.routeConfig.data.persist = this.persist.bind(this);
    this.fields.forEach((field) => this.group.addControl(field.name,
      this.builder.control(field.value, field.tests)));
  }

  public ngOnDestroy(): void {
    delete this.route.routeConfig.data.persist;
  }

  public persist(item: Model = this.item): Observable<any> {
    Object.keys(this.group.controls)
      .filter((key) => this.group.get(key).dirty)
      .filter((key) => !this.fields.find((field) => field.name !== key).model)
      .forEach((key) => item[key] = this.value(key));

    return !this.model['provider'] ? of(item) : item.id
      ? this.model['provider'].update(item, item.id)
      : this.model['provider'].create(item);
  }

  public value(field: string): any {
    const control = this.group.get(field);
    return control ? control.value : this.item[field];
  }

  protected ngPostInit(): void { }

  protected formed(model: Type<Model>): Type<Model> {
    return Object.defineProperty(model, 'stepper', { value: this.constructor });
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
