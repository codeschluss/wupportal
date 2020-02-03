import { Component, Type } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Box, TokenProvider } from '@wooportal/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InfopageModel } from '../../../base/models/infopage.model';
import { TopicModel } from '../../../base/models/topic.model';
import { InfopageProvider } from '../../../base/providers/infopage.provider';
import { TranslationProvider } from '../../../base/providers/translation.provider';
import { BaseForm, FormField } from '../base/base.form';
import { EditorFieldComponent } from '../fields/editor.field';
import { SelectFieldComponent } from '../fields/select.field';
import { StringFieldComponent } from '../fields/string.field';

@Component({
  selector: 'infopage-form',
  template: BaseForm.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'content'">
          <i18n i18n="@@content">content</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'title'">
          <i18n i18n="@@title">title</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'topic'">
          <i18n i18n="@@topic">topic</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class InfopageFormComponent
  extends BaseForm<InfopageModel> {

  public fields: FormField[] = [
    {
      name: 'title',
      input: StringFieldComponent,
      tests: [Validators.required]
    },
    {
      name: 'topic',
      input: SelectFieldComponent,
      label: 'name',
      model: TopicModel,
      tests: [Validators.required]
    },
    {
      name: 'content',
      input: EditorFieldComponent,
      tests: [Validators.required]
    }
  ];

  public model: Type<InfopageModel> = InfopageModel;

  public constructor(
    private infopageProvider: InfopageProvider,
    route: ActivatedRoute,
    tokenProvider: TokenProvider,
    translationProvider: TranslationProvider
  ) {
    super(route, tokenProvider, translationProvider);
  }

  public persist(): Observable<any> {
    this.item.topicId = this.group.get('topic').value.id;

    return super.persist();
  }

  protected cascade(item: InfopageModel): Observable<any> {
    const links = [];

    if (this.item.id) {
      const tId = this.item.topic && this.item.topic.id;
      if (tId !== this.item.topicId) { links.push(this.infopageProvider
        .relinkTopic(item.id, Box(this.item.topicId))); }
    }

    return forkJoin([super.cascade(item), ...links]).pipe(map((i) => i[0]));
  }

}
