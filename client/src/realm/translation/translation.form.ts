import { AfterViewInit, Component, OnDestroy, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudModel, SessionProvider, TokenProvider } from '@portal/core';
import { BaseForm, FormField, SelectFieldComponent } from '@portal/forms';
import { empty, merge, Observable, Subscription } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
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
      <nav>
        <button mat-button color="warn" (click)="clear()">
          <i18n i18n="@@deleteAll">deleteAll</i18n>
        </button>
      </nav>
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

  public get valid(): boolean {
    return true;
  }

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

    this.values = merge(...controls.map((ctrl) => ctrl.valueChanges))
      .subscribe(() => this.update(this.group.get('language').value));
  }

  public ngOnDestroy(): void {
    this.selection.unsubscribe();
    this.values.unsubscribe();
  }

  public clear(): void {
    this.group.patchValue({ language: this.language });
    this.route.routeConfig.data.translations = this.route.snapshot.data
      .language.map((lang) => this.empty(lang));
  }

  public persist(): Observable<any> {
    return this.translationProvider.translate(
      Object.keys(this.form.group.value)
        .filter((key) => this.model['translatable'].includes(key))
        .map((key) => ({ [key]: this.form.group.get(key).value }))
        .reduce((obj, v) => Object.assign(obj, v), { }),
      this.route.snapshot.data.language.filter((lang) => {
        if (lang.id === this.language.id) { return false; }
        const value = this.translations.find((t) => t.language.id === lang.id);
        return this.model['translatable'].some((t) => !value[t]);
      }).map((lang) => lang.locale),
      this.language.locale
    ).pipe(map((items) => this.translations.map((t) => Object.assign(t,
      (items.find((i) => i.lang === t.language['locale']) || { }).translations
    )).filter((t) => t.language.id !== this.language.id)));
  }

  public reset(): void {
    this.group.patchValue({ language: this.language });
    delete this.route.routeConfig.data.translations;
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
