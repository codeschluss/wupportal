import { AfterViewInit, Component, OnDestroy, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudModel, SessionProvider, TokenProvider } from '@portal/core';
import { BaseForm, FormField, SelectFieldComponent } from '@portal/forms';
import { empty, merge, Observable, of, Subscription } from 'rxjs';
import { startWith, take } from 'rxjs/operators';
import { ClientPackage } from '../../utils/package';
import { LanguageModel } from '../language/language.model';
import { TranslationProvider } from './translation.provider';

@Component({
  selector: 'translation-form',
  template: BaseForm.template(`
    <section>
      <label class="mat-body-strong">
        <i18n i18n="@@compilation">compilation</i18n>
      </label>
      <output>
        <button mat-button (click)="this.translate()">
          <i18n i18n="@@autoTranslate">autoTranslate</i18n>
        </button>
      </output>
    </section>

    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'language'">
          <i18n i18n="@@language">language</i18n>
        </ng-container>
        <ng-container *ngSwitchDefault>
          <i18n>{{ case.name }}</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class TranslationFormComponent<Model extends CrudModel>
  extends BaseForm<Model> implements AfterViewInit, OnDestroy {

  public fields: FormField[] = [
    {
      name: 'language',
      input: SelectFieldComponent,
      label: 'name',
      model: LanguageModel,
      tests: [Validators.required]
    }
  ];

  public model: Type<Model> = Object as any;

  private form: BaseForm<Model>;

  private language: LanguageModel;

  private selection: Subscription = empty().subscribe();

  private values: Subscription = empty().subscribe();

  private get translations(): Model[] {
    if (!this.route.routeConfig.data.translations) {
      this.route.routeConfig.data.translations = this.route.snapshot.data
        .language.map((lang) => this.translation(lang) || this.empty(lang));
    }

    return this.route.routeConfig.data.translations;
  }

  public constructor(
    private sessionProvider: SessionProvider,
    private translationProvider: TranslationProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider
  ) {
    super(route, tokenProvider);
  }

  public ngAfterViewInit(): void {
    const control = this.group.get('language');
    const controls = Object.keys(this.group.controls)
      .filter((key) => key !== 'language')
      .map((key) => this.group.get(key));

    this.selection = control.valueChanges.pipe(
      startWith(control.value)
    ).subscribe((value) => {
      if (value.id === this.language.id) {
        controls.forEach((ctrl) => ctrl.disable({ emitEvent: false }));
        value = this.route.parent.routeConfig.children[0].data.group.value;
      } else {
        controls.forEach((ctrl) => ctrl.enable({ emitEvent: false }));
        value = this.translations.find((t) => t.language.id === value.id);
      }

      this.group.patchValue(value, { emitEvent: false });
    });

    this.values = merge(...controls.map((ctrl) => ctrl.valueChanges)).pipe(

    ).subscribe(() => this.update(this.group.get('language').value));
  }

  public ngOnDestroy(): void {
    this.selection.unsubscribe();
    this.values.unsubscribe();
  }

  public persist(): Observable<any> {
    return of(this.translations
        .filter((t) => t.language.id !== this.language.id));
  }

  public reset(): void {
    this.group.patchValue({ language: this.language });
    delete this.route.routeConfig.data.translations;
  }

  public translate(): void {
    this.translationProvider.translate(
      Object.keys(this.form.group.value)
        .filter((key) => this.model['translatable'].includes(key))
        .map((key) => ({ [key]: this.form.group.get(key).value }))
        .reduce((obj, v) => Object.assign(obj, v), { }),
      this.route.snapshot.data.language
        .filter((lang) => lang.id !== this.language.id)
        .map((lang) => lang.locale),
      this.language.locale
    ).subscribe((items) =>
      this.route.routeConfig.data.translations = this.translations.map((t) =>
        Object.assign(t, items.find((i) => i.lang === t.language['locale']))));
  }

  protected ngPostInit(): void {
    this.form = this.route.parent.routeConfig.children[0].data.form;
    this.model = this.form.item.constructor as any;

    this.form.fields
      .filter((field) => this.model['translatable'].includes(field.name))
      .forEach((field) => this.fields.push(field));

    this.sessionProvider.value.pipe(take(1)).subscribe((session) => {
      const fallback = this.route.snapshot.data.language.find((lang) =>
        lang.locale === ClientPackage.config.translations.defaultLocale);
      const selected = this.route.snapshot.data.language.find((lang) =>
        lang.locale === session.language);

      this.language = this.fields[0].value = selected || fallback;
    });
  }

  private empty(language: LanguageModel): Model {
    return this.model['translatable']
      .reduce((item, t) => Object.assign(item, { [t]: null }),
        Object.assign(new this.model(), { language: language }));
  }

  private translation(language: LanguageModel): Model {
    return this.form.item.translations && this.form.item.translations
      .find((t) => t.language.id === language.id) as Model;
  }

  private update(language: LanguageModel): void {
    const controls = Object.keys(this.group.controls)
      .filter((field) => field !== 'language')
      .map((ctrl) => ({ [ctrl]: this.group.get(ctrl).value }));

    const translation = Object.assign(this.translations
      .find((t) => t.language.id === language.id), ...controls);

    this.route.routeConfig.data.translations = this.translations
      .map((t) => t.language.id !== language.id ? t : translation);
  }

}
