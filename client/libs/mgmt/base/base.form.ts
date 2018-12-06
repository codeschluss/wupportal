import { OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseService, CrudModel, CrudProvider } from '@portal/core';
import { BaseFieldComponent } from './base.field';

export interface FormField {
  name: string;
  input: Type<BaseFieldComponent>;
  value: any;
  label?: string;
  model?: Type<CrudModel>;
  options?: CrudModel[];
  tests?: ValidatorFn[];
  type?: string;
}

export abstract class BaseForm
  <Model extends CrudModel, Provider extends CrudProvider<BaseService, Model>>
  implements OnInit {

  public group: FormGroup;

  public abstract fields: FormField[];

  protected abstract builder: FormBuilder;

  protected abstract model: Type<Model>;

  protected abstract provider: Provider;

  protected abstract route: ActivatedRoute;

  protected static template(template: string): string {
    return `
      <ng-template>
        ${template}
      </ng-template>
      <form [formGroup]="group" (ngSubmit)="submit()">
        <ng-container *ngFor="let field of fields">
          <base-field [field]="field" [group]="group"></base-field>
        </ng-container>
        <button type="submit">TEST</button>
      </form>
    `;
  }

  public ngOnInit(): void {
    this.group = this.builder.group({ });

    this.fields.forEach((field) => this.group.addControl(field.name,
      this.builder.control(field.value, field.tests)));
  }

  public submit(): void {
    console.log(this.group.value);
  }

  protected formed(model: Type<Model>): Type<Model> {
    return Object.defineProperty(model, 'form', {
      value: this.constructor
    });
  }

  protected save(model: Model): Promise<any> {
    return model.id
      ? this.provider.update(model.id, model)
      : this.provider.create(model);
  }

}
