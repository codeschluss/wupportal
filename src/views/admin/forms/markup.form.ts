import { AfterViewInit, Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoreSettings, LanguageModel, SessionProvider, TokenProvider, TranslationProvider } from '../../../core';
import { MarkupModel } from '../../../core/models/markup.model';
import { BaseForm, FormField } from '../base/base.form';
import { EditorFieldComponent } from '../fields/editor.field';
import { SelectFieldComponent } from '../fields/select.field';

@Component({
  selector: 'markup-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'content'">
          <i18n>content</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'language'">
          <i18n>language</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class MarkupFormComponent
  extends BaseForm<MarkupModel>
  implements AfterViewInit {

  public item: any;

  public fields: FormField[] = [
    {
      name: 'language',
      input: SelectFieldComponent,
      label: 'name',
      model: LanguageModel,
      tests: [Validators.required]
    },
    {
      name: 'content',
      input: EditorFieldComponent,
      model: MarkupModel,
      tests: [Validators.required]
    }
  ];

  public model: Type<MarkupModel> = MarkupModel;

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
    return this.translationProvider.update(Object.assign(new MarkupModel(), {
      content: this.group.get('content').value,
      id: this.item.id,
      language: this.language,
      tagId: this.item.tagId
    }), 'markups').pipe(tap((result) => {
      const target = this.item.translatables.find((translatable) => {
        return translatable.language.locale === this.language.locale;
      });

      if (target) {
        target.content = result.content;
      } else {
        this.item.translatables.push(Object.assign(result, {
          language: this.language
        }));
      }

      this.reset();
    }));
  }

  public reset(): void {
    this.group.patchValue({
      content: this.item.translatables?.find((translatable) => {
        return translatable.language.locale === this.language.locale;
      })?.content
    }, { emitEvent: false });

    this.group.markAsPristine();
  }

  protected ngPostInit(): void {
    const fallback = this.route.snapshot.data.language.find((lang) =>
      lang.locale === this.settings.defaults.language);
    const selected = this.route.snapshot.data.language.find((lang) =>
      lang.locale === this.sessionProvider.getLanguage());

    this.language = this.fields[0].value = selected || fallback;
  }

}
