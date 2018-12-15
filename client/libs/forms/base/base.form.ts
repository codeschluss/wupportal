import { Input, OnInit, Type } from '@angular/core';
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

export abstract class BaseForm<Model extends CrudModel> implements OnInit {

  @Input()
  public group: FormGroup;

  @Input()
  public item: Model;

  public abstract fields: FormField[];

  public abstract model: Type<Model>;

  protected abstract builder: FormBuilder;

  protected abstract route: ActivatedRoute;

  protected static template(template: string): string {
    return `
      <ng-template #label let-field="field">
        <ng-container [ngSwitch]="field.name">${template}</ng-container>
      </ng-template>
      <form [formGroup]="group">
        <ng-container *ngFor="let field of fields">
          <ng-container *ngTemplateOutlet="label; context: { field: field }">
          </ng-container>
          <base-field [field]="field" [group]="group"></base-field>
        </ng-container>
      </form>
    `;
  }

  public get isValid(): boolean {
    return this.group.valid;
  }

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
    this.fields.forEach((field) => this.group.addControl(field.name,
      this.builder.control(field.value, field.tests)));
  }

  public save(): Observable<any> {
    return of(console.log(this.group.value));
  }

  protected ngPostInit(): void { }

}
