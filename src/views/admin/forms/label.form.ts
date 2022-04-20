import { AfterViewInit, Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoreSettings, LabelModel, LanguageModel, SessionProvider, TokenProvider, TranslationProvider } from '../../../core';
import { BaseForm, FormField } from '../base/base.form';
import { InputFieldComponent } from '../fields/input.field';
import { SelectFieldComponent } from '../fields/select.field';

@Component({
  selector: 'label-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'language'">
          <i18n>language</i18n>
        </ng-container>
        <ng-container *ngSwitchDefault>
          <strong><i18n>{{ case.name.substr(1) }}</i18n></strong>
          <br><em>{{ case.name.substr(1) }}</em>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class LabelFormComponent
  extends BaseForm<LabelModel>
  implements AfterViewInit {

  declare public item: any;

  public fields: FormField[] = [
    {
      name: 'language',
      input: SelectFieldComponent,
      label: 'name',
      model: LanguageModel,
      tests: [Validators.required]
    }
  ];

  public model: Type<LabelModel> = LabelModel;

  private language: LanguageModel;

  public constructor(
    private sessionProvider: SessionProvider,
    private settings: CoreSettings,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public ngAfterViewInit(): void {
    this.group.get('language').valueChanges.subscribe((value) => {
      this.language = value;
      this.reset();
    });
  }

  public persist(): Observable<any> {
    return forkJoin(Object.keys(this.group.controls).filter((key) => {
      return key !== 'language' && this.group.get(key).dirty;
    }).map((key) => new this.model({
      content: this.group.get(key).value,
      id: this.item.find((i) => i.tagId === key.substr(1)).id,
      language: this.language,
      tagId: key.substr(1)
    })).map((item) => {
      return this.translationProvider.update(item, 'labels');
    })).pipe(tap((results) => results.forEach((result) => {
      const label = this.item.find((item) => {
        return item.tagId === result.tagId;
      });

      const target = label.translatables.find((translatable) => {
        return translatable.language.locale === this.language.locale;
      });

      if (target) {
        target.content = result.content;
      } else {
        label.translatables.push(Object.assign(result, {
          language: this.language
        }));
      }
    })), tap(() => this.reset()));
  }

  public reset(): void {
    this.group.patchValue(this.fields.slice(1).reduce((obj, field) => {
      return Object.assign(obj, {
        [field.name]: this.item.find((item) => {
          return item.tagId === field.name.substr(1);
        }).translatables.find((translatable) => {
          return translatable.language.locale === this.language.locale;
        })?.content
      });
    }, { }), { emitEvent: false });

    this.group.markAsPristine();
  }

  protected ngPostInit(): void {
    const fallback = this.route.snapshot.data.language.find((lang) =>
      lang.locale === this.settings.defaults.language);
    const selected = this.route.snapshot.data.language.find((lang) =>
      lang.locale === this.sessionProvider.getLanguage());

    this.language = this.fields[0].value = selected || fallback;

    this.item.forEach((item) => this.fields.push({
      name: `@${item.tagId}`,
      input: InputFieldComponent,
      value: item.translatables.find((translatable) => {
        return translatable.language.locale === this.language.locale
      })?.content
    }));
  }

}
