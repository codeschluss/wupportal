import { Directive, HostBinding, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccessTokenModel, CrudModel, TokenProvider, TranslationProvider } from '../../../core';
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

@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BaseForm<Model extends CrudModel>
  implements OnInit, OnDestroy {

  public abstract fields: FormField[];

  public abstract model: Type<Model>;

  @HostBinding('attr.base')
  public readonly base: string = 'form';

  @Input()
  public group: FormGroup;

  @Input()
  public item: Model;

  @Input()
  protected token: AccessTokenModel;

  protected static template(prefix: string = '', suffix: string = ''): string {
    return `
      <form [formGroup]="group">
        ${prefix}
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
        ${suffix}
      </form>
    `;
  }

  public get dirty(): boolean {
    return this.group.dirty;
  }

  public get valid(): boolean {
    return this.group.valid;
  }

  public constructor(
    protected route: ActivatedRoute,
    protected tokenProvider: TokenProvider,
    protected translationProvider: TranslationProvider
  ) { }

  public ngOnInit(): void {
    this.route.routeConfig.data.form = this;

    this.group = this.group
      || this.route.snapshot.data.group
      || new FormGroup({ });

    this.item = this.item
      || this.route.snapshot.data.item
      || new this.model();

    this.token = this.token
      || this.route.snapshot.data.tokens.access
      || new AccessTokenModel();

    this.fields = this.fields.map((field) => Object.assign(field, {
      options: field.options || this.route.snapshot.data[field.name],
      value: field.value || this.item[field.name]
    }));

    this.ngPostInit();

    this.fields.forEach((field) => {
      this.group.addControl(field.name, new FormControl({
        disabled: field.locked,
        value: field.value
      }, field.tests));
    });
  }

  public ngOnDestroy(): void {
    if (!BaseStepper.isPrototypeOf(this.route.parent.routeConfig.component)) {
      delete this.route.routeConfig.data.form;
    }
  }

  public persist(override: boolean = false): Observable<any> {
    const item = new this.model(this.item);
    const provider = (this.model as any).provider;

    this.fields.forEach((field) => Object.assign(item, {
      [field.name]: this.group.get(field.name).value
    }));

    return (
      !provider || !this.group.dirty
        ? of(item)
        : item.id && !override
          ? provider.update(item)
          : provider.create(item)
    ).pipe(
      mergeMap((persisted) => this.cascade(persisted as Model))
    );
  }

  public required(field: FormField): boolean {
    return field.tests && field.tests.includes(Validators.required);
  }

  public reset(): void {
    this.group.reset(this.item);
    this.group.markAsPristine();
  }

  protected ngPostInit(): void { }

  protected cascade(item: Model): Observable<any> {
    const translations = this.group.get('translations');

    return translations
      ? forkJoin(translations.value.map((translation) => {
          const { id, ...rest } = translation;
          translation = Object.assign(Object.create(item), item, rest);
          return this.translationProvider.update(translation);
        }))
      : of(item);
  }

  protected updated(field: string): {
    add: (CrudModel & any)[];
    del: (CrudModel & any)[];
  } {
    const del = (this.item[field] || []);
    const mod = (this.group.get(field).value || []).filter((item) => item.id);
    const put = (this.group.get(field).value || []).filter((item) => !item.id);

    return {
      add: mod.filter((m) => !del.some((d) => d.id === m.id)).concat(put),
      del: del.filter((t) => !mod.some((m) => m.id === t.id))
    };
  }

}
