import { Component, ComponentFactoryResolver, HostBinding, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudModel } from '@portal/core';
import { FormField } from './base.form';

@Component({
  selector: 'base-field',
  template: ``
})

export class BaseFieldComponent implements OnInit {

  @HostBinding('class')
  public class: string = 'base-field';

  @Input()
  public field: FormField;

  @Input()
  public group: FormGroup;

  protected static template(template: string): string {
    return `
      <mat-form-field [formGroup]="group">
        ${template}
        <ng-container *ngFor="let error of errors" ngProjectAs="mat-error">
          <mat-error>
            <ng-container [ngSwitch]="error">
              <ng-container *ngSwitchCase="'minLength'">
                <i18n i18n="@@fieldErrorMinLength">fieldErrorMinLength</i18n>
              </ng-container>
              <ng-container *ngSwitchCase="'missmatch'">
                <i18n i18n="@@fieldErrorMissmatch">fieldErrorMissmatch</i18n>
              </ng-container>
              <ng-container *ngSwitchCase="'pattern'">
                <i18n i18n="@@fieldErrorPattern">fieldErrorPattern</i18n>
              </ng-container>
              <ng-container *ngSwitchCase="'required'">
                <i18n i18n="@@fieldErrorRequired">fieldErrorRequired</i18n>
              </ng-container>
            </ng-container>
          </mat-error>
        </ng-container>
      </mat-form-field>
    `;
  }

  public get errors(): string[] {
    const errors = this.group.get(this.field.name).errors;
    return errors ? Object.keys(errors) : [];
  }

  public get value(): any { return this.group.get(this.field.name).value; }
  public set value(value: any) {
    this.group.get(this.field.name).markAsDirty();
    this.group.get(this.field.name).markAsTouched();
    this.group.get(this.field.name).patchValue(value);
  }

  public constructor(
    private container: ViewContainerRef,
    private factories: ComponentFactoryResolver
  ) { }

  public ngOnInit(): void {
    if (this.constructor === BaseFieldComponent) {
      const component = this.container.createComponent(
        this.factories.resolveComponentFactory(this.field.input));

      component.instance.field = this.field;
      component.instance.group = this.group;
    } else {
      this.ngPostInit();
    }
  }

  public toId(input: CrudModel): string;
  public toId(input: CrudModel[]): string[];
  public toId(input: CrudModel | CrudModel[]): string | string[] {
    return !input ? null : Array.isArray(input)
      ? input.map((item) => item.id)
      : input.id;
  }

  public toLabel(input: CrudModel): string;
  public toLabel(input: CrudModel[]): string[];
  public toLabel(input: CrudModel | CrudModel[]): string | string[] {
    return !input ? null : Array.isArray(input)
      ? input.map((item) => item[this.field.label])
      : input[this.field.label];
  }

  public toModel(input: string): CrudModel;
  public toModel(input: string[]): CrudModel[];
  public toModel(input: string | string[]): CrudModel | CrudModel[] {
    const modeler = (id: string) => this.field.options
      .find((item) => item.id === id);

    return !input ? null : Array.isArray(input)
      ? input.map((id) => modeler(id))
      : modeler(input);
  }

  protected ngPostInit(): void { }

}
