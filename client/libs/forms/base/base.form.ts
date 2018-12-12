import { OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudModel } from '@portal/core';
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

export abstract class BaseForm<Model extends CrudModel> implements OnInit {

  public abstract fields: FormField[];

  public abstract model: Type<Model>;

  public group: FormGroup;

  protected abstract builder: FormBuilder;

  protected abstract route: ActivatedRoute;

  protected static template(template: string): string {
    return `
      <ng-template>${template}</ng-template>
      <form [formGroup]="group">
        <ng-container *ngFor="let field of fields">
          <base-field [field]="field" [group]="group"></base-field>
        </ng-container>
      </form>
    `;
  }

  public ngOnInit(): void {
    this.group = this.route.snapshot.data.group;
    this.fields = this.fields.map((field) => Object.assign(field, {
      label: field.label || 'name',
      options: field.options || this.route.snapshot.data[field.name],
      value: field.value || this.route.snapshot.data.model[field.name]
    }));

    this.ngPostInit();
    this.fields.forEach((field) => this.group.addControl(field.name,
      this.builder.control(field.value, field.tests)));
  }

  protected ngPostInit(): void { }

  protected save(model: Model): Promise<any> {
    return model.id
      ? this.model['provider'].update(model.id, model)
      : this.model['provider'].create(model);
  }

}
