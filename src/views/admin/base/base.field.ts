import { Component, ComponentFactoryResolver, HostBinding, Input, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { CrudModel } from '../../../core';
import { FormField } from './base.form';

@Component({
  selector: 'base-field',
  template: ``
})

export class BaseFieldComponent
  implements OnInit {

  @HostBinding('attr.base')
  public readonly base: string = 'field';

  @Input()
  public field: FormField;

  @Input()
  public group: FormGroup;

  protected static template(template: string): string {
    return `
      <mat-form-field [formGroup]="group">
        ${template}
        <ng-container ngProjectAs="mat-error" *ngFor="let error of errors">
          <mat-error>
            <ng-container [ngSwitch]="error">
              <ng-container *ngSwitchCase="'minLength'">
                <i18n>minLengthError</i18n>
              </ng-container>
              <ng-container *ngSwitchCase="'mismatch'">
                <i18n>mismatchError</i18n>
              </ng-container>
              <ng-container *ngSwitchCase="'neither'">
                <i18n>neitherError</i18n>
              </ng-container>
              <ng-container *ngSwitchCase="'pattern'">
                <i18n>patternError</i18n>
              </ng-container>
              <ng-container *ngSwitchCase="'required'">
                <i18n>requiredError</i18n>
              </ng-container>
            </ng-container>
          </mat-error>
        </ng-container>
      </mat-form-field>
    `;
  }

  public get control(): AbstractControl {
    return this.group.get(this.field.name);
  }

  public get errors(): string[] {
    const errors = this.control.errors;
    return errors ? Object.keys(errors) : [];
  }

  public get value(): any {
    return this.control.value;
  }

  public set value(value: any) {
    this.control.markAsDirty();
    this.control.patchValue(value);
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

}
