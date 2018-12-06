import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudModel } from '@portal/core';
import { BooleanFieldComponent } from '../field/boolean.field';
import { ChipListFieldComponent } from '../field/chip-list.field';
import { DatetimeFieldComponent } from '../field/datetime.field';
import { SelectFieldComponent } from '../field/select.field';
import { StringFieldComponent } from '../field/string.field';
import { TextareaFieldComponent } from '../field/textarea.field';
import { FormField } from './base.form';

@Component({
  entryComponents: [
    BooleanFieldComponent,
    ChipListFieldComponent,
    DatetimeFieldComponent,
    SelectFieldComponent,
    StringFieldComponent,
    TextareaFieldComponent
  ],
  selector: 'base-field',
  template: ''
})

export class BaseFieldComponent implements OnInit {

  @Input()
  public field: FormField;

  @Input()
  public group: FormGroup;

  protected static template(template: string): string {
    return `
      <mat-form-field [formGroup]="group">
        ${template}
        <ng-container *ngFor="let test of field.tests" ngProjectAs="mat-error">
          <mat-error *ngIf="group.get(field.name).hasError(test.name)">
            {{ test.name }}
          </mat-error>
        </ng-container>
      </mat-form-field>
    `;
  }

  public constructor(
    private container: ViewContainerRef,
    private factories: ComponentFactoryResolver
  ) { }

  public get value(): any { return this.group.get(this.field.name).value; }
  public set value(set: any) { this.group.get(this.field.name).setValue(set); }

  public ngOnInit(): void {
    if (this.constructor === BaseFieldComponent) {
      const component = this.container.createComponent(
        this.factories.resolveComponentFactory(this.field.input));

      component.instance.field = this.field;
      component.instance.group = this.group;
    } else {
      this.ngPostInit();
      this.group.get(this.field.name).valueChanges
        .subscribe((i) => console.log(this.field.name, i));
    }
  }

  public toId(input: CrudModel): string;
  public toId(input: CrudModel[]): string[];
  public toId(input: CrudModel | CrudModel[]): string | string[] {
    return Array.isArray(input) ? input.map((model) => model.id) : input.id;
  }

  public toLabel(input: CrudModel): string;
  public toLabel(input: CrudModel[]): string[];
  public toLabel(input: CrudModel | CrudModel[]): string | string[] {
    return Array.isArray(input)
      ? input.map((model) => model[this.field.label])
      : input[this.field.label];
  }

  public toModel(input: string): CrudModel;
  public toModel(input: string[]): CrudModel[];
  public toModel(input: string | string[]): CrudModel | CrudModel[] {
    const toModel = (id: string) =>
      this.field.options.find((model) => model.id === id);

    return Array.isArray(input)
      ? input.map((id) => toModel(id))
      : toModel(input);
  }

  protected ngPostInit(): void { }

}
